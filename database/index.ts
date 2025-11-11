// Central export file for all database models
export { default as Event } from './event.model'
export { default as Booking } from './booking.model'

// Re-export types for convenience
export type { IEvent, IEventLean } from './event.model'
export type { IBooking } from './booking.model'
