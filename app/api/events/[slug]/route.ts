import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Event } from '@/database'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = await params

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug parameter is required and must be a valid string' },
        { status: 400 }
      )
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase()

    // Establish database connection
    await connectDB()

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean()

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { error: `Event with slug "${sanitizedSlug}" not found` },
        { status: 404 }
      )
    }

    // Return event data
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    )
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching event by slug:', error)
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { error: 'Database configuration error' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Failed to fetch event' },
        { status: 500 }
      )
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: 'An unexpected error occurred while fetching the event' },
      { status: 500 }
    )
  }
}
