from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import json

app = FastAPI(title="VERDE API", version="1.0.0")

# CORS — allow frontend domain
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", "https://amhan.netlify.app/"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Supabase Client ───
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

def get_supabase() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise HTTPException(500, "Supabase not configured")
    return create_client(SUPABASE_URL, SUPABASE_KEY)


# ─── Health Check ───
@app.get("/api")
def health():
    return {"status": "ok", "service": "VERDE API", "version": "1.0.0"}


# ─── Auth Helpers ───
async def get_current_user(request: Request):
    """Extract and verify user from Authorization header."""
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(401, "Missing authentication token")
    
    token = auth_header.replace("Bearer ", "")
    supabase = get_supabase()
    
    try:
        user = supabase.auth.get_user(token)
        return user.user
    except Exception:
        raise HTTPException(401, "Invalid token")


async def require_admin(request: Request):
    """Verify the user is an admin."""
    user = await get_current_user(request)
    supabase = get_supabase()
    
    result = supabase.table("profiles").select("role").eq("id", user.id).single().execute()
    if not result.data or result.data["role"] not in ("admin", "super_admin"):
        raise HTTPException(403, "Admin access required")
    
    return user


# ─── Product Endpoints ───
@app.get("/api/products")
def get_products(category: Optional[str] = None, search: Optional[str] = None, tag: Optional[str] = None):
    supabase = get_supabase()
    query = supabase.table("products").select("*, categories(name)").eq("is_active", True)
    
    if category:
        query = query.eq("category_id", category)
    if search:
        query = query.ilike("name", f"%{search}%")
    
    result = query.order("created_at", desc=True).execute()
    return {"products": result.data}


@app.get("/api/products/{slug}")
def get_product(slug: str):
    supabase = get_supabase()
    result = supabase.table("products").select("*, categories(name)").eq("slug", slug).single().execute()
    if not result.data:
        raise HTTPException(404, "Product not found")
    return {"product": result.data}


# ─── Order Endpoints ───
class OrderCreate(BaseModel):
    items: list
    shipping_address: dict
    notes: Optional[str] = ""

@app.post("/api/orders")
async def create_order(order: OrderCreate, request: Request):
    user = await get_current_user(request)
    supabase = get_supabase()
    
    # Calculate totals
    subtotal = sum(item["price"] * item["quantity"] for item in order.items)
    shipping = 0 if subtotal >= 1999 else 199
    tax = round(subtotal * 0.18)
    total = subtotal + shipping + tax
    
    # Create order
    import uuid
    order_number = f"ORD-{str(uuid.uuid4())[:8].upper()}"
    
    order_data = {
        "order_number": order_number,
        "user_id": user.id,
        "status": "pending",
        "subtotal": subtotal,
        "shipping_cost": shipping,
        "tax": tax,
        "total": total,
        "shipping_address": order.shipping_address,
        "notes": order.notes,
    }
    
    result = supabase.table("orders").insert(order_data).execute()
    order_id = result.data[0]["id"]
    
    # Create order items
    for item in order.items:
        supabase.table("order_items").insert({
            "order_id": order_id,
            "product_id": item["id"],
            "product_name": item["name"],
            "product_image": item.get("image", ""),
            "size": item.get("size", ""),
            "color": item.get("color", ""),
            "quantity": item["quantity"],
            "unit_price": item["price"],
        }).execute()
    
    return {"order_id": order_id, "order_number": order_number, "total": total}


@app.get("/api/orders")
async def get_user_orders(request: Request):
    user = await get_current_user(request)
    supabase = get_supabase()
    result = supabase.table("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", desc=True).execute()
    return {"orders": result.data}


# ─── Razorpay Placeholder ───
# When Razorpay is ready, uncomment and configure:
#
# import razorpay
# RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
# RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
# razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
#
# class PaymentOrder(BaseModel):
#     amount: int  # in paise
#     currency: str = "INR"
#     receipt: str
#
# @app.post("/api/create-payment")
# async def create_payment(payment: PaymentOrder, request: Request):
#     user = await get_current_user(request)
#     order = razorpay_client.order.create({
#         "amount": payment.amount,
#         "currency": payment.currency,
#         "receipt": payment.receipt,
#     })
#     return {"order_id": order["id"], "amount": order["amount"]}
#
# @app.post("/api/verify-payment")
# async def verify_payment(request: Request):
#     body = await request.json()
#     try:
#         razorpay_client.utility.verify_payment_signature({
#             "razorpay_order_id": body["razorpay_order_id"],
#             "razorpay_payment_id": body["razorpay_payment_id"],
#             "razorpay_signature": body["razorpay_signature"],
#         })
#         # Update order status in Supabase
#         return {"status": "success"}
#     except Exception:
#         raise HTTPException(400, "Payment verification failed")


# ─── Shopify Placeholder ───
# When Shopify is ready, add these endpoints:
#
# @app.post("/api/shopify/sync-product")
# async def sync_product_to_shopify(product_id: str, request: Request):
#     await require_admin(request)
#     # Use Shopify Admin API to create/update product
#     pass
#
# @app.post("/api/shopify/webhook")
# async def shopify_webhook(request: Request):
#     # Handle Shopify order webhooks
#     pass


# ─── Admin Endpoints ───
@app.get("/api/admin/stats")
async def admin_stats(request: Request):
    await require_admin(request)
    supabase = get_supabase()
    
    products = supabase.table("products").select("id", count="exact").execute()
    orders = supabase.table("orders").select("id, total", count="exact").execute()
    customers = supabase.table("profiles").select("id", count="exact").eq("role", "customer").execute()
    
    revenue = sum(o["total"] for o in (orders.data or []))
    
    return {
        "products": products.count,
        "orders": orders.count,
        "customers": customers.count,
        "revenue": revenue,
    }


@app.put("/api/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, request: Request):
    await require_admin(request)
    body = await request.json()
    supabase = get_supabase()
    
    supabase.table("orders").update({"status": body["status"]}).eq("id", order_id).execute()
    return {"status": "updated"}


@app.put("/api/admin/users/{user_id}/role")
async def update_user_role(user_id: str, request: Request):
    """Only super_admin can change roles."""
    admin = await require_admin(request)
    supabase = get_supabase()
    
    # Verify caller is super_admin
    caller = supabase.table("profiles").select("role").eq("id", admin.id).single().execute()
    if caller.data["role"] != "super_admin":
        raise HTTPException(403, "Only super admins can manage roles")
    
    body = await request.json()
    supabase.table("profiles").update({"role": body["role"]}).eq("id", user_id).execute()
    return {"status": "updated"}


# ─── Vercel Handler ───
# This is required for Vercel serverless deployment
handler = app
