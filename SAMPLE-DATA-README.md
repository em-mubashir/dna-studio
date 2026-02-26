# Sample Data Seeding - DNA Media Website

## Overview

This document explains the sample data that has been added to the Payload CMS collections and what still needs to be added manually through the CMS interface.

## How to Run the Seed Script

```bash
npm run seed
```

The script is idempotent - it checks for existing data and won't create duplicates if you run it multiple times.

## ✅ Successfully Seeded Collections

### 1. Settings Global (1 entry)
**Location**: `/admin/globals/settings`

Seeded data includes:
- Contact information (email, phone, address in English and Arabic)
- Social media links (Facebook, Instagram, Twitter, LinkedIn, YouTube, Vimeo)
- SEO defaults (site name and description in both languages)
- Business hours (in English and Arabic)

### 2. Services Collection (6 entries)
**Location**: `/admin/collections/services`

Seeded services:
1. Commercial Production
2. Corporate Videos
3. Documentary Films
4. Animation & Motion Graphics
5. Event Coverage
6. Social Media Content

Each service includes:
- Bilingual titles and descriptions
- URL slug
- Category
- Featured flag
- Display order

### 3. Timeline Collection (5 entries)
**Location**: `/admin/collections/timeline`

Seeded timeline items:
1. 2015 - DNA Media Founded (milestone)
2. 2017 - First Major Award (award)
3. 2019 - Expanded to Dubai (milestone)
4. 2021 - Excellence in Documentary (award)
5. 2023 - 100+ Projects Milestone (milestone)

Each item includes:
- Year
- Bilingual titles and descriptions
- Type (milestone or award)

### 4. Pages Collection (3 entries)
**Location**: `/admin/collections/pages`

Seeded pages:
1. **Home** (`slug: home`)
   - Hero section with heading, subheading, CTA button
   - Background video ID placeholder
   - SEO metadata

2. **About Us** (`slug: about`)
   - Hero section
   - SEO metadata

3. **Contact Us** (`slug: contact`)
   - Hero section
   - SEO metadata

All pages are set to "published" status.

## ⚠️ Collections Requiring Manual Entry

The following collections require file uploads (images) which cannot be seeded programmatically. You must add these through the CMS interface at `http://localhost:3000/admin`.

### 1. Team Members Collection
**Location**: `/admin/collections/team`

**Required fields**:
- Name
- Position (English and Arabic)
- Bio (English and Arabic)
- **Photo** (required - upload image)
- LinkedIn URL (optional)
- Display order

**Suggested entries**:
- Ahmed Al-Rashid - Founder & Creative Director
- Sarah Johnson - Director of Photography
- Mohammed Al-Zahrani - Senior Editor
- Layla Hassan - Motion Graphics Designer

### 2. Clients Collection
**Location**: `/admin/collections/clients`

**Required fields**:
- Client name
- **Logo** (required - upload image)
- Website URL (optional)
- Display order

**Suggested entries**:
- Saudi Aramco
- STC
- Al Rajhi Bank
- Saudi Airlines
- Almarai
- SABIC

### 3. Portfolio Collection
**Location**: `/admin/collections/portfolio`

**Required fields**:
- Title (English and Arabic)
- Slug
- Client name
- Description (English and Arabic)
- Category (commercial, corporate, documentary, animation, event)
- Video URL (Vimeo)
- **Thumbnail** (required - upload image)
- Featured flag
- Completion date
- Display order

**Suggested entries**:
- Aramco Vision 2030 (corporate)
- STC 5G Launch (commercial)
- Almarai Farm Documentary (documentary)
- Saudi Airlines Safety Video (animation)
- SABIC Innovation Summit (event)
- Al Rajhi Bank Ramadan Campaign (commercial)

### 4. Blog Collection
**Location**: `/admin/collections/blog`

**Required fields**:
- Title (English and Arabic)
- Slug
- Excerpt (English and Arabic)
- Content (English and Arabic)
- **Featured Image** (required - upload image)
- Category
- Tags (English and Arabic)
- **Author** (required - relationship to Users collection)
- Published date
- Status (draft or published)

**Suggested entries**:
- 5 Tips for Creating Engaging Video Content
- The Rise of Video Marketing in Saudi Arabia
- Behind the Scenes: Our Latest Commercial
- The Power of Animation in Brand Storytelling
- Video Production Trends for 2024

## 📝 Next Steps

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Access the CMS**:
   Open `http://localhost:3000/admin` in your browser

3. **Add media content**:
   - Upload team member photos
   - Upload client logos
   - Upload portfolio thumbnails
   - Upload blog featured images

4. **Create blog posts**:
   - Select an author from the Users collection
   - Add featured images
   - Write content in both languages

5. **Verify the seeded data**:
   - Check Settings global
   - Review Services collection
   - Review Timeline collection
   - Review Pages collection

## 🔄 Re-running the Seed Script

The seed script is safe to run multiple times. It will:
- Skip existing entries (based on unique slugs or identifiers)
- Only create new entries that don't exist
- Update the Settings global each time

## 🗑️ Clearing Sample Data

If you want to start fresh, you can delete entries manually through the CMS interface or drop the MongoDB database:

```bash
# Connect to MongoDB and drop the database
mongosh
use dna-media
db.dropDatabase()
```

Then run the seed script again to repopulate.

## 📚 Additional Resources

- **Payload CMS Documentation**: https://payloadcms.com/docs
- **Project Requirements**: `.kiro/specs/dna-media-website/requirements.md`
- **Project Design**: `.kiro/specs/dna-media-website/design.md`
- **Implementation Tasks**: `.kiro/specs/dna-media-website/tasks.md`

---

**Last Updated**: February 26, 2026
**Seed Script Location**: `scripts/seed-sample-data.ts`
