import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-4xl font-bold text-violet-600">Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded">
        Return Home
      </Link>
    </div>
  )
}