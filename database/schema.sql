-- ============================================================
-- Hooman Site - Multi-category E-commerce Database Schema
-- PostgreSQL DDL
-- ============================================================

-- ---------- Users & Auth ----------
CREATE TABLE users (
    id              BIGSERIAL PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) UNIQUE,
    phone           VARCHAR(20) UNIQUE,
    password_hash   VARCHAR(255),
    is_guest        BOOLEAN NOT NULL DEFAULT FALSE,
    status          VARCHAR(20) NOT NULL DEFAULT 'active', -- active, blocked
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE social_accounts (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider        VARCHAR(30) NOT NULL, -- google, telegram, instagram
    provider_uid    VARCHAR(191) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (provider, provider_uid)
);

CREATE TABLE addresses (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(50),
    province        VARCHAR(100) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    full_address    TEXT NOT NULL,
    postal_code     VARCHAR(20),
    receiver_name   VARCHAR(150) NOT NULL,
    receiver_phone  VARCHAR(20) NOT NULL,
    is_default      BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE admin_roles (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL UNIQUE -- super_admin, product_manager, support, warehouse
);

CREATE TABLE admin_users (
    id              BIGSERIAL PRIMARY KEY,
    role_id         INT NOT NULL REFERENCES admin_roles(id),
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Categories & Products ----------
CREATE TABLE categories (
    id              BIGSERIAL PRIMARY KEY,
    parent_id       BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(160) NOT NULL UNIQUE,
    icon_url        VARCHAR(255),
    sort_order      INT NOT NULL DEFAULT 0
);

CREATE TABLE products (
    id              BIGSERIAL PRIMARY KEY,
    category_id     BIGINT NOT NULL REFERENCES categories(id),
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(280) NOT NULL UNIQUE,
    description     TEXT,
    brand           VARCHAR(150),
    base_price      NUMERIC(14,0) NOT NULL, -- Toman
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_products_category ON products(category_id);

CREATE TABLE product_variants (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku             VARCHAR(100) NOT NULL UNIQUE,
    color           VARCHAR(50),
    size            VARCHAR(50),
    price           NUMERIC(14,0) NOT NULL,
    compare_at_price NUMERIC(14,0) -- for showing discount strike-through
);

CREATE TABLE product_images (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url             VARCHAR(500) NOT NULL,
    sort_order      INT NOT NULL DEFAULT 0
);

CREATE TABLE inventory (
    variant_id      BIGINT PRIMARY KEY REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity        INT NOT NULL DEFAULT 0,
    reserved        INT NOT NULL DEFAULT 0
);

CREATE TABLE product_reviews (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment         TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE product_views (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id) ON DELETE SET NULL,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    viewed_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_product_views_user ON product_views(user_id);

-- ---------- Cart & Orders ----------
CREATE TABLE carts (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id) ON DELETE CASCADE,
    session_id      VARCHAR(100), -- for guest carts
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cart_items (
    id              BIGSERIAL PRIMARY KEY,
    cart_id         BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id      BIGINT NOT NULL REFERENCES product_variants(id),
    quantity        INT NOT NULL DEFAULT 1 CHECK (quantity > 0)
);

CREATE TABLE coupons (
    id              BIGSERIAL PRIMARY KEY,
    code            VARCHAR(50) NOT NULL UNIQUE,
    discount_type   VARCHAR(20) NOT NULL, -- percent, fixed
    discount_value  NUMERIC(14,0) NOT NULL,
    min_order_total NUMERIC(14,0) NOT NULL DEFAULT 0,
    max_usage       INT,
    used_count      INT NOT NULL DEFAULT 0,
    expires_at      TIMESTAMPTZ
);

CREATE TABLE orders (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id),
    address_id      BIGINT NOT NULL REFERENCES addresses(id),
    coupon_id       BIGINT REFERENCES coupons(id),
    subtotal        NUMERIC(14,0) NOT NULL,
    discount_total  NUMERIC(14,0) NOT NULL DEFAULT 0,
    shipping_cost   NUMERIC(14,0) NOT NULL DEFAULT 0,
    grand_total     NUMERIC(14,0) NOT NULL,
    status          VARCHAR(30) NOT NULL DEFAULT 'pending', -- pending, paid, processing, shipped, delivered, cancelled
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_user ON orders(user_id);

CREATE TABLE order_items (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id      BIGINT NOT NULL REFERENCES product_variants(id),
    quantity        INT NOT NULL,
    unit_price      NUMERIC(14,0) NOT NULL -- price at purchase time
);

CREATE TABLE payments (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway         VARCHAR(30) NOT NULL, -- zarinpal, payping, wallet, cod
    amount          NUMERIC(14,0) NOT NULL,
    ref_id          VARCHAR(150),
    status          VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, success, failed
    paid_at         TIMESTAMPTZ
);

CREATE TABLE wallet_transactions (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount          NUMERIC(14,0) NOT NULL, -- positive: charge, negative: spend
    type            VARCHAR(30) NOT NULL, -- topup, order_payment, refund
    order_id        BIGINT REFERENCES orders(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Loyalty Club ----------
CREATE TABLE loyalty_tiers (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL, -- برنزی, نقره‌ای, طلایی
    min_points      INT NOT NULL,
    perk_description TEXT
);

CREATE TABLE loyalty_points (
    user_id         BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    tier_id         INT NOT NULL REFERENCES loyalty_tiers(id),
    total_points    INT NOT NULL DEFAULT 0
);

CREATE TABLE loyalty_point_transactions (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id        BIGINT REFERENCES orders(id),
    points          INT NOT NULL, -- positive: earned, negative: redeemed
    reason          VARCHAR(100),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Product Recommendations ----------
CREATE TABLE product_recommendations (
    id                  BIGSERIAL PRIMARY KEY,
    product_id          BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    related_product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    score               NUMERIC(6,4) NOT NULL DEFAULT 0,
    reason              VARCHAR(30) NOT NULL DEFAULT 'co_purchase', -- co_purchase, similar_category, viewed_together
    UNIQUE (product_id, related_product_id)
);
CREATE INDEX idx_recommendations_product ON product_recommendations(product_id);
