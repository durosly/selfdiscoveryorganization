# Self Discovery Organization — Website Upgrade Brief

> **Context for AI Assistant (Cursor)**
> This document is a comprehensive brief for upgrading the Self Discovery Organization charity website. Use it to understand the project scope, tech stack, design direction, and content requirements before making any changes.

---

## 1. Project Overview

**Organization:** Self Discovery Organization
**Type:** UK-Registered Charity
**Mission:** Healing the world of its challenges by uniting people with a sense of purpose — through education, humanitarian outreach, leadership development, and community support.

**Goal of This Upgrade:** Full redesign and feature upgrade of an existing Next.js charity website, focusing on a modern UI, a functional donation system, and improved authentication.

---

## 2. Tech Stack

| Layer          | Current         | Target                        |
| -------------- | --------------- | ----------------------------- |
| Framework      | Next.js         | Next.js (latest)              |
| UI Components  | DaisyUI v5      | DaisyUI v5                    |
| Styling        | Tailwind CSS v4 | Tailwind CSS v4               |
| Authentication | NextAuth        | **better-auth**               |
| Payments       | None            | PayPal (now) → Stripe (later) |

### Authentication Migration: NextAuth → better-auth

- Remove all `next-auth` dependencies, configuration, and API routes
- Install and configure `better-auth`
- Migrate session handling, protected routes, and any OAuth providers to better-auth equivalents
- Update all `useSession`, `getSession`, and `signIn`/`signOut` calls to better-auth hooks and methods
- Ensure middleware-based route protection is re-implemented using better-auth session utilities

---

## 3. Design Reference

**Template to use as UI inspiration:**
[Charius — Charity & Nonprofit Next.js Template](https://preview.themeforest.net/item/charius-charity-nonprofit-next-js-template/full_screen_preview/52105952)

**Reference donation page (layout/UX inspiration):**
[Manifest Church — Online Donation](https://manifestchurch.co.uk/online-donation/)

Apply the Charius template's visual language — layout patterns, card styles, hero sections, typography choices — using DaisyUI v5 components and Tailwind CSS v4 utility classes. Do not copy code directly; adapt the design to the existing Next.js project structure.

---

## 4. Selected Upgrade Package

**Premium Package** — Full scope:

- Complete modern UI redesign (based on Charius template)
- Full donation system:
     - Preset donation tiers
     - Custom amount input
     - Monthly/recurring donation toggle
     - PayPal integration (primary)
     - Stripe integration (future-ready, scaffold now)
     - Donor tracking
- Advanced event system:
     - Event registration with attendee limits
     - Admin view of registered attendees
- SEO + performance optimisation
- Full better-auth migration (replacing NextAuth)

---

## 5. Donation Page — Full Specification

### 5.1 Page Structure (in order)

1. Hero Section
2. Mission Statement
3. Donation Amount Selector
4. What Your Donation Supports (4 cards)
5. Impact Section
6. Trust / Credibility Section
7. Payment Options
8. Final Call to Action

---

### 5.2 Hero Section

**Headline:** Give Today. Change a Life.

**Subheading:**

> Your support helps us reach vulnerable families, support children's education, empower young people, and restore hope through the work of Self Discovery Organization.

**Primary CTA Button:** `Donate Now`
**Secondary Button:** `See Our Impact`

**Background:** Full-width image showing real humanitarian work — children, school outreach, family support, or community intervention.

---

### 5.3 Mission Statement Section

**Section Title:** Why Your Giving Matters

**Body:**

> Self Discovery Organization is a UK-registered charity committed to healing the world of its challenges by uniting people with a sense of purpose. Through education, humanitarian outreach, leadership development, and community support, we are helping individuals and families move from struggle to hope.

---

### 5.4 Donation Amount Selector

**Section Title:** Choose an Amount

**Preset Tiers (clickable boxes):**

| Amount | Description                                                    |
| ------ | -------------------------------------------------------------- |
| £10    | Helps provide essential support materials                      |
| £25    | Supports outreach to vulnerable individuals                    |
| £50    | Helps fund educational or welfare assistance                   |
| £100   | Contributes meaningfully to a family or community intervention |
| Custom | Free-text input field: `£ ____`                                |

**Below the amount selector:**

- Checkbox: `☐ Make this a monthly donation` _(important for recurring revenue planning)_
- Button: `Donate Securely`

---

### 5.5 What Your Donation Supports (4 Cards)

**Section Title:** Your Gift Makes Real Impact Possible

| Card | Title                                      | Description                                                                                                |
| ---- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1    | Send a Child to School Scheme              | Helping disadvantaged children with tuition, learning materials, uniforms, and educational support.        |
| 2    | Families and Prisoners Initiative          | Providing welfare support for indigent families, and dignity items, encouragement, and care for prisoners. |
| 3    | Menstrual Hygiene & Youth Empowerment      | Supporting girls and young people with dignity materials, education, and practical empowerment.            |
| 4    | Community Support & Leadership Development | Building purpose-driven communities through mentorship, conferences, outreach, and support programmes.     |

---

### 5.6 Impact Section

**Section Title:** Your Generosity at Work

**Impact Statements:**

- Supported children with school fees and educational needs
- Reached families in need with food and welfare items
- Extended hope and practical care to prisoners
- Empowered young people through purpose and leadership programmes
- Launched humanitarian and community support initiatives across the UK, Nigeria, and Zimbabwe

**Bold Figures (display as stat cards):**

- 37+ children supported in one intervention
- 25 families reached with food support
- Hundreds fed through outreach programmes

---

### 5.7 Trust / Credibility Section

**Section Title:** Give with Confidence

**Body:**

> Your donation helps us continue impactful work in communities that need it most. Self Discovery Organization is a registered charity, and we are committed to integrity, compassion, and responsible stewardship.

**Trust Badges:**

- ✅ UK Registered Charity _(add charity number when available)_
- ✅ Secure Payment Processing
- ✅ Transparent Use of Funds

---

### 5.8 Payment Options Section

**Section Title:** Ways to Give

**Payment methods to display:**

- PayPal _(active — integrate now)_
- Debit / Credit Card _(scaffold for Stripe — activate later)_
- Bank Transfer _(display details as static text)_

**Implementation note:** Use PayPal Donations SDK or PayPal Checkout button for the PayPal integration. The button should pass the selected donation amount and recurrence preference dynamically. Scaffold a Stripe integration path but keep it inactive until instructed.

---

### 5.9 Final Call to Action

**Headline:** Be the Reason Someone Finds Hope Today

**Body:**

> Every donation, whether big or small, helps us bring relief, restore dignity, and inspire purpose. Partner with us today and become part of a vision that is transforming lives.

**Button:** `Donate Now`

---

## 6. Donation Categories (for dropdown / designation field)

When donors choose what to give towards, provide these options:

- Families and Prisoners Initiative
- Self Discovery Conference
- Menstrual Hygiene Day
- Debate and Quiz Competition
- International Day of the Boy Child
- Send a Child to School Scheme

---

## 7. Emotional CTA Copy (use across the page and in buttons/headings)

Replace generic "Donate" with emotionally resonant language:

- _"Give a Child a Future"_
- _"Support a Family Today"_
- _"Be the Reason Someone Eats Tonight"_
- _"Give Today. Change a Life."_
- _"Be the Reason Someone Finds Hope Today"_

---

## 8. Event System Requirements

- Event listing page with registration
- Per-event attendee limits (configurable)
- Admin dashboard view showing registered attendees per event
- Events should link to donation categories where applicable (e.g. Self Discovery Conference, Menstrual Hygiene Day)

---

## 9. SEO & Performance Notes

- Add `<meta>` descriptions and Open Graph tags to the donation page
- Use Next.js `Image` component for all images (lazy loading, optimisation)
- Ensure the donation page is server-side rendered or statically generated where possible
- Add semantic HTML landmarks (`<main>`, `<section>`, `<article>`) throughout

---

## 10. Implementation Notes for Cursor

- **Do not break existing pages** — scope changes to the donation page, auth system, and UI reskin unless instructed otherwise
- **DaisyUI v5 + Tailwind v4** — use DaisyUI component classes (`btn`, `card`, `badge`, `stat`, etc.) and Tailwind utilities; avoid custom CSS unless necessary
- **better-auth** — follow the official better-auth docs for Next.js App Router integration; replace all next-auth patterns systematically
- **PayPal** — use the `@paypal/react-paypal-js` package for the donation button; amount should be driven by the selected tier or custom input
- **Monthly donations** — pass `vault=true` or use PayPal Subscriptions API if the monthly toggle is checked
- **Stripe scaffold** — create a `/api/stripe/checkout` route stub and a disabled UI button, so it is easy to activate later
