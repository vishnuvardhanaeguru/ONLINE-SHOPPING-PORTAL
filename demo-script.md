# CloudCart – Demo Video Script

A scene-by-scene guide for recording a ~4–5 minute product walkthrough with a
screen recorder (OBS Studio, Loom, ShareX, QuickTime, etc.). Run the stack
first with `docker compose up --build` from the `docker/` folder, then seed
one admin user and a few products so the recording has real data to show.

**Before recording — seed data checklist**
- [ ] At least 4 categories exist (already seeded by `schema.sql`)
- [ ] 8–12 products added across categories, each with an image URL
- [ ] One user promoted to `ROLE_ADMIN` in the `user_roles` table
- [ ] Browser zoom at 100%, window sized to 1280×800 for clean framing
- [ ] Close unrelated tabs/notifications

---

## Scene 1 — Cold open (0:00–0:15)
**Visual:** CloudCart home page (`/`)
**Narration:**
> "This is CloudCart — a cloud-native online shopping portal built with React, Spring Boot, and deployed on AWS with Docker and Kubernetes."

**Action:** Let the home page sit for 2–3 seconds, then click "Shop Now."

---

## Scene 2 — Browsing & search (0:15–0:50)
**Visual:** Products page (`/products`)
**Narration:**
> "Customers can browse the full catalog, filter by category, or search by keyword."

**Actions:**
1. Show the grid of product cards.
2. Type a keyword into the search box (e.g. "phone") → hit Search.
3. Clear it, select a category from the dropdown instead.
4. Click into one product to open its detail page.

---

## Scene 3 — Product details & reviews (0:50–1:15)
**Visual:** Product details page (`/products/:id`)
**Narration:**
> "Each product page shows price, stock, and customer reviews with star ratings."

**Actions:**
1. Scroll to show the reviews section.
2. Click "Add to Cart" — point out the confirmation message.

---

## Scene 4 — Auth flow (1:15–1:45)
**Visual:** Login / Register pages
**Narration:**
> "Authentication is handled with JWT — short-lived access tokens paired with refresh tokens, and passwords are hashed with BCrypt."

**Actions:**
1. If not already logged in, show the Register form, submit it.
2. Show the navbar updating with the user's name after login.
*(If you're already logged in from adding to cart, skip to narrate: "I'm logged in as a customer here.")*

---

## Scene 5 — Cart management (1:45–2:15)
**Visual:** Cart page (`/cart`)
**Narration:**
> "The cart supports quantity updates and item removal, with the total recalculating live."

**Actions:**
1. Increase/decrease quantity on one item with the +/- buttons.
2. Remove a second item.
3. Point at the running total.
4. Click "Proceed to Checkout."

---

## Scene 6 — Checkout & order placement (2:15–2:45)
**Visual:** Checkout page → Order details page
**Narration:**
> "At checkout, the customer enters a shipping address and picks a payment method. Placing the order decrements stock and creates a payment record server-side."

**Actions:**
1. Fill in shipping address.
2. Select a payment method (e.g. UPI).
3. Submit → land on the new order's details page.
4. Point out order ID, status badge, and line items.

---

## Scene 7 — Order history (2:45–3:00)
**Visual:** My Orders page (`/orders`)
**Narration:**
> "Customers can review past orders any time, and cancel ones that haven't shipped yet."

**Action:** Click back to "My Orders," show the list.

---

## Scene 8 — Admin dashboard (3:00–3:40)
**Visual:** Admin Dashboard (`/admin`)
**Narration:**
> "On the admin side, there's a live dashboard summarizing customers, products, orders, and total revenue."

**Actions:**
1. Log out, log back in as the admin account (or switch browser profile).
2. Show the four stat cards.
3. Navigate to Admin → Products.

---

## Scene 9 — Admin product management (3:40–4:10)
**Visual:** Admin Products page
**Narration:**
> "Admins can add, edit, or soft-delete products directly — inventory updates here reflect immediately on the storefront."

**Actions:**
1. Add a new product using the form.
2. Edit an existing product's price or stock.
3. Delete a product, and note it disappears from the customer catalog view.

---

## Scene 10 — Infra close-out (4:10–4:45)
**Visual:** Terminal / architecture diagram (use the PPT architecture slide or `k8s/` folder listing)
**Narration:**
> "Under the hood, the frontend and backend run as separate Docker images, deployed to Kubernetes with a Horizontal Pod Autoscaler, behind an AWS Application Load Balancer. GitHub Actions builds, tests, containerizes, and deploys on every push to main, with CloudWatch monitoring and SNS notifications wired in."

**Actions:**
1. `kubectl get pods -n cloudcart` (if you have a live cluster) — show pods running.
2. Or, cut to the CI/CD pipeline YAML / a green GitHub Actions run.

---

## Scene 11 — Outro (4:45–5:00)
**Visual:** Back to home page
**Narration:**
> "That's CloudCart — a full-stack, cloud-native shopping portal ready to scale on AWS. Thanks for watching."

---

## Recording tips
- Record narration and screen separately if possible, then sync in editing — easier to fix flubbed lines.
- Keep mouse movements slow and deliberate; pause ~1s after each click before speaking over it.
- Export at 1080p, 30fps; keep the file under ~150MB by using H.264 for easy embedding in the PPT or README.
- If time-constrained, Scenes 2, 5, 6, and 8 are the highest-value four to keep if you need a 90-second cut.
