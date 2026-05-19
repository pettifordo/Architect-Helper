'use client';

import Link from 'next/link';
import { getAllTemplates } from '@/lib/templates';

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Report Templates</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Link key={template.id} href={`/templates/${template.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer h-full p-6">
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View Report →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
