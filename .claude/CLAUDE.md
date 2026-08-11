# CLAUDE.md — Business Management System (BMS)

## What this is

A multi-tenant business management system (BMS) that runs the daily operations of a small business from one place: **stock, sales, purchasing, customer credit, supplier payables, cash, expenses, simple manufacturing, and profit** — with every action recorded and auditable. It is the digital replacement for the paper register (bahi-khata) and disconnected spreadsheets these businesses use today.

One backend serves many independent businesses (tenants). Each business configures its own currency, tax and timezone, so the same product works locally (Pakistan) and worldwide.

## Who it's for

- **Retail shops** — sell over the counter, some credit customers.
- **Wholesalers / distributors** — bulk sales, heavy customer credit and supplier payables.
- **Small factories / makers** — buy raw materials and manufacture finished goods to sell (e.g. a PVC-pipe maker, a bakery, a garment workshop).

Users inside a business are its **employees** (owner, manager, salesperson). Customers and suppliers are *records*, not logins, in v1.

## Goals (what "good" means for the business)

- **One source of truth.** Stock, balances and profit are always consistent and never disputed.
- **Know the real numbers.** Accurate cost of goods and true profit — not guesswork.
- **Control credit.** Track exactly who owes what (customer udhaar) and what the business owes suppliers, with aging and limits.
- **Nothing lost, nothing faked.** Completed records can't be silently changed; every sensitive action is audited.
- **Works for makers too.** A business that manufactures can cost what it makes from the materials it consumes.
- **Sellable as SaaS.** Multi-tenant, multi-currency, capability-gated so each business only sees what it needs.

---

## How a business uses it (the daily cycle)

A business signs up and becomes a tenant with one owner. The owner configures the business, enables the capabilities it needs, and invites employees with roles. They add products (and raw materials/recipes if they manufacture), customers and suppliers, and enter opening stock and balances.

Then day to day: they **buy** goods from suppliers (increasing stock and, on credit, supplier payables), optionally **manufacture** finished goods from raw materials, **sell** through the point of sale (for cash, card, wallet, or on credit to a named customer), take **payments** against credit, handle **returns and refunds**, record **expenses**, and open/close **cash counters**. At any time they see **reports** — profit, customer/supplier aging, inventory — and get **alerts** for low stock and overdue balances. Owners can **close a period** so the past can't be altered.

---

## Feature areas (business capabilities)

- **Businesses & setup** — sign up, configure profile/currency/tax/timezone, enable capabilities, onboarding tasks, per-business document numbering.
- **Employees & access** — invite employees, assign roles (owner/manager/salesperson), action-level permissions (e.g. who may see cost, apply discounts, reverse a sale, write off debt).
- **Catalog** — products and raw materials with types (trading, manufactured, raw, service), categories, variations, barcodes, unit conversions (buy in cartons, sell in pieces), tax categories, price lists for wholesale.
- **Inventory** — live stock from a movement history; opening stock; adjustments for damage/loss/count; low-stock thresholds; moving weighted-average cost.
- **Contacts** — customers (credit limit, terms, opening balance, advances) and suppliers (payables, terms).
- **Point of sale** — search/scan, pick customer or walk-in, quantities and units, line and sale discounts, tax, split payment (cash + card + credit), hold a sale, complete → invoice.
- **Sales returns & refunds** — return against an original sale; restock resellable goods, record damaged ones as loss; refund as cash, customer advance, or credit note.
- **Purchasing** — draft → complete purchases, allocate transport/extra costs into item cost, purchase returns, reversal.
- **Customer credit** — credit sales, partial payments, allocation across invoices, advances, debt write-offs, statements, aging.
- **Supplier payables** — track and pay what's owed, allocate payments, advances, aging.
- **Cash & accounts** — cash counters and bank/wallet/card accounts; open a session with a float, reconcile and close with shortage/excess.
- **Expenses** — record running costs (paid now/later/partial) by category; feed net profit.
- **Manufacturing (gated)** — raw materials, versioned recipes (bill of materials), production runs that consume materials and produce finished goods, with true manufactured cost and wastage.
- **Reports** — dashboard, profit & loss, customer/supplier aging, inventory valuation.
- **Trust & control** — audit log of sensitive actions, low-stock/overdue/sensitive-activity alerts, period closing, import/export.

---

## Business rules that shape everything

- **Each business is isolated.** Data never crosses tenants.
- **Roles limit actions, not just menus.** A salesperson may sell but not see profit or reverse a sale unless permitted.
- **Money is exact and never negative;** stock can never go negative; quantities respect each unit's precision.
- **Completed records are final.** Fix mistakes by reversing (which keeps the original visible), never by silent edits.
- **History is frozen.** Old invoices keep their original prices, costs and tax even after current values change.
- **Profit is real.** Revenue counts at sale; cost of goods uses the cost at sale time; collecting old debt is not new revenue; buying unsold stock is not an immediate expense.
- **Capabilities gate modules.** A retail shop never sees manufacturing; enabling it reveals materials, recipes and production.
- **Everything is timezone-correct** to the business, and every sensitive action is audited.

---

## v1 scope

**In:** everything above — full sell/buy/make/pay/report cycle for a single business location, multi-tenant, multi-currency, with credit, manufacturing, cash sessions, returns, expenses, reporting, audit, and import/export.

**Out (later phases):** multi-branch/warehouse, customer self-service portal, advanced manufacturing (multi-stage work-in-progress, sub-assemblies, by-products, material requirements planning), advanced analytics.

---

## Domain glossary (so short prompts are unambiguous)

- **Tenant / Organization** — one business. Everything belongs to one.
- **Capability** — a per-business feature switch (e.g. manufacturing, customer credit).
- **Walk-in** — an unnamed customer; only allowed when a sale is fully paid.
- **Credit sale (udhaar)** — a sale left partly/fully unpaid; requires a named customer within their credit limit.
- **Advance** — money a customer paid ahead (or an unrefunded return), held against future sales; shown separately from debt.
- **Held sale** — a sale parked mid-transaction; reserves no stock; must re-check stock when resumed.
- **Reversal** — undoing a *completed* record by appending compensating entries; the original stays visible. Not an edit or delete.
- **Write-off** — clearing uncollectable customer debt as a business loss (needs approval); not a payment.
- **Aging** — grouping unpaid balances by how overdue they are (not due, 1–30, 31–60, 61–90, 90+ days).
- **COGS** — cost of goods sold; the cost of items at the moment they were sold.
- **Moving weighted-average cost** — the live stock cost method; each purchase blends into a running average unit cost.
- **Stock movement** — one recorded change in stock (in or out) with its cost; stock on hand is the sum of these.
- **Ledger (customer/supplier)** — the running list of debits/credits that defines a party's balance.
- **Raw material** — stock consumed to make goods; never sold directly.
- **Recipe / BOM** — the materials and quantities needed to produce one unit of a manufactured product; versioned.
- **Production run** — making a batch: consumes materials, produces finished goods, computes their cost.
- **Cash session** — an open cash counter with a float, reconciled and closed with any shortage/excess.
- **Payment account** — where money sits: a cash counter, bank, mobile wallet, or card.
- **Period closing** — locking a past date range so no one can add or backdate transactions into it.
- **Opening balance / opening stock** — starting figures entered when a business begins using the system.

Multi-tenant SaaS backend for shops, wholesalers and small factories. Django + DRF API only; a separate React app (built by another developer) consumes the OpenAPI contract. Sellable locally (Pakistan) and worldwide, so nothing about currency, tax or timezone is hardcoded.

**Read this file before writing code. The "Golden rules" are load-bearing — violating them silently corrupts financial data.**

---

## Stack

- Python 3.12, Django 5, Django REST Framework
- PostgreSQL (no SQLite, even in tests — money + concurrency behaviour must match prod)
- SimpleJWT (auth), drf-spectacular (OpenAPI schema), djangorestframework-camel-case (API casing)
- Celery + Redis (async: low-stock alerts, notifications)
- pytest-django, factory-boy, coverage.py

---

## Golden rules (do not break these)

1. **Tenant isolation is absolute.** Every business model inherits `TenantScopedModel` and carries `organization`. No query may run unscoped by organization. A user in Org A must never see Org B data — this is the one property that can never regress.

2. **The three spines are the source of truth; documents write into them.**
   - `StockMovement` — every change in stock, with cost.
   - `CustomerLedgerEntry` / `SupplierLedgerEntry` — every change in a balance.
   Balances (`stock_on_hand`, `current_balance`, `current_payable`) are **summed from the spines**, never stored-and-mutated as a standalone number. Sales/purchases/production/returns *append* spine rows; they never edit stock or balances directly.

3. **Spine rows are append-only.** Never update or delete a `StockMovement` or ledger entry to "fix" something. Corrections are new, compensating rows.

4. **Completed records are immutable. Correct via reversal.** A completed sale/purchase/production/expense is never edited or deleted — you reverse it (which appends compensating spine entries and leaves the original visible). Lifecycle for every document: `draft → completed → reversed`, plus `held / cancelled / archived` where relevant.

5. **Completion is atomic.** A sale that reduces stock + writes a ledger entry + records payment either happens completely or not at all. All multi-record effects run inside one `transaction.atomic()` block in a service function — **never** split across signals or `save()` overrides.

6. **Money is `Decimal`, never `float`.** Quantize to the currency's precision. Quantities use each unit's permitted precision (`is_fractional`). No completed action may drive stock negative.

7. **History is frozen.** Completed prices, costs, tax and recipe versions do not change when current values change. COGS is snapshotted onto `SaleItem.unit_cost` at sale time even though the live method is moving weighted-average.

8. **Everything sensitive is audited.** Sales, discounts, refunds, payments, reversals, price/cost changes, permission changes, exports → append an `AuditEntry`. The log is append-only; not even an owner can rewrite it.

---

## Costing

Live method: **moving weighted-average** per stocked item. Each stock-in recomputes `Product.average_cost = new_total_value / new_total_qty`; each stock-out consumes at the current average and records `avg_cost_after` on the movement. `SaleItem.unit_cost` snapshots the average at sale time so historical profit stays frozen.

---

## App structure & dependency direction

Ten apps. Dependencies flow **one way** — document apps depend on spine apps, never the reverse. The polymorphic `source_type`/`source_id` (GenericForeignKey) on spines is what keeps this acyclic: `inventory` and `finance` never import `sales`/`purchasing`.

```
organizations   Organization, OrganizationCapability, DocumentSequence, Period, Attachment
accounts        User (AUTH_USER_MODEL), Membership, Permission, RolePermission, Invitation
catalog         Category, UnitOfMeasure, TaxRate, Product, ProductVariation, ProductUnit, PriceList, PriceListItem
inventory       StockMovement, StockAdjustment                    ← stock spine
contacts        Customer, Supplier
finance         PaymentAccount, Payment, PaymentAllocation, CashSession,
                CustomerLedgerEntry, SupplierLedgerEntry, DebtWriteOff, Expense, ExpenseCategory   ← money spines
sales           Sale, SaleItem, SaleReturn, SaleReturnItem
purchasing      Purchase, PurchaseItem, PurchaseReturn, PurchaseReturnItem
manufacturing   Recipe, RecipeItem, ProductionRun, ProductionMaterial   ← gated by capability
audit           AuditEntry, Alert, DataImport
```

Build/migrate order: `organizations` + `accounts` first (custom User must exist before the first migrate) → `catalog` → `contacts` → `inventory` → `finance` → `sales`/`purchasing` → `manufacturing` → `audit`.

---

## Data model conventions

- UUID primary keys.
- Inherit `TenantScopedModel` (adds `organization` FK + org-filtering manager) on every business model.
- Money: `DecimalField(max_digits=18, decimal_places=2)`. Quantities: `decimal_places` per the unit.
- Soft-delete via `is_archived`; never hard-delete records with history.
- Status fields are explicit enums matching the spec's states.
- Spine sources use `GenericForeignKey` (`source_type` + `source_id`); same for `PaymentAllocation.target_*`.
- Per-business, per-doc-type numbering via `DocumentSequence`, incremented with `select_for_update()` inside the completion transaction so numbers are unique and never reused.

---

## API conventions

- Versioned under `/api/v1/`.
- **camelCase JSON at the boundary** (via camel-case renderer/parser); **snake_case everywhere in Python.** Don't hand-write camelCase in serializers.
- JWT auth; permissions are **action-level** (`view_cost`, `apply_discount`, `reverse_txn`…), enforced server-side — never rely on the frontend hiding a control.
- The OpenAPI schema (drf-spectacular) is the contract with the React app. After changing any serializer/endpoint, regenerate `schema.yaml` and keep it committed.
- Return errors as structured, field-level messages.

---

## Business logic lives in services, not models

Thin models. Put every multi-step operation in `app/services.py`, wrapped in `transaction.atomic()`. Models validate their own fields; services orchestrate cross-model effects and write the spines.

```python
# sales/services.py
def complete_sale(sale, *, actor):
    with transaction.atomic():
        _assert_stock_available(sale)                     # re-check at completion
        for item in sale.items.all():
            record_stock_out(item, source=sale, actor=actor)   # → StockMovement
        if sale.balance > 0:
            add_customer_debit(sale.customer, sale, sale.balance)  # → ledger
        apply_payments(sale)                              # → Payment (+ account)
        sale.invoice_number = next_number(sale.organization, "sale")
        sale.status = "completed"
        sale.save()
        write_audit(actor, "sale.completed", sale)
```

Never do stock/ledger writes in `Model.save()` or signals — it makes atomicity and testing impossible to reason about.

---

## Testing (ship tests with every slice)

- pytest-django + factory-boy; factories set `organization` explicitly.
- **Mandatory per feature:** a tenant-isolation test (Org A cannot touch Org B) and, for any completion, an atomicity test (a forced failure mid-way leaves stock, ledger and payments all unchanged).
- Also cover: negative-stock prevention, double-completion / duplicate-number prevention, weighted-average math, immutability of historical figures after a later price change.
- Keep coverage meaningful, not just high. Use `transaction.on_commit` awareness in tests where Celery tasks fire.

---

## Commands

```bash
# dev
docker compose up -d db redis
python manage.py migrate
python manage.py runserver

# quality
pytest
pytest --cov
python manage.py spectacular --file schema.yaml   # regenerate the API contract

# db
python manage.py makemigrations
python manage.py migrate
```

---

## Locked decisions (see DECISIONS.md)

- Multi-tenant via shared DB + `organization` FK on every model.
- Custom `User` set on migration #1; roles are per-org via `Membership`.
- Costing: moving weighted-average + per-line snapshot.
- Ledgers are real tables (auditability), not derived on the fly.
- Manufacturing is a gated module (capability toggle at the boundary, not `if factory` checks).

---

## Never do

- Query without organization scope.
- Mutate or delete a spine row, or edit a completed document, to "fix" data.
- Put cross-model business logic in `save()` or signals.
- Use `float` for money, or compare money with `==` on floats.
- Hardcode currency symbols, tax rates, or timezones.
- Trust the client for permissions or for recomputable totals/costs.
- Let `sales`/`purchasing` be imported by `inventory`/`finance` (breaks the dependency direction).

---

## Working style

- Build vertically: one feature model → service → serializer → view → tests → schema, then the next. No big-bang horizontal layers.
- Commit convention: conventional commits (`feat:`, `fix:`, `test:`, `refactor:`), small and focused.
- When a change touches money or stock, add the test first.
# Product & Business Context

Paste this near the top of CLAUDE.md (or keep as `PRODUCT.md` and reference it). It explains **what the product is and how the business works**, so tasks can be described in a sentence without re-explaining the domain each time.

---

