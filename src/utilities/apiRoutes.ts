import { NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'
import { ValidationError } from 'yup'

export const handleError = (error: unknown): Response => {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  } else if (error instanceof AppwriteException) {
    return NextResponse.json({ error: error.message }, { status: error.code ?? 500 })
  } else {
    console.error('Unknown error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
