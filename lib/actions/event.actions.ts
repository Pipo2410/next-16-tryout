'use server'

import { Event, IEventLean } from '@/database'
import connectDB from '../mongodb'

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEventLean[]> => {
  try {
    await connectDB()

    const event = await Event.findOne({ slug })

    if (!event) return []

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean<IEventLean[]>()
  } catch {
    return []
  }
}
