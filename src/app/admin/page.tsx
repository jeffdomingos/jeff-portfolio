import { redirect } from 'next/navigation'

// This page exists solely to redirect /admin to the static Decap CMS HTML file.
// Without this, the [locale] dynamic route would match "admin" as a locale and crash.
export default function AdminPage() {
    redirect('/admin/index.html')
}
