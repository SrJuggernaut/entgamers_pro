import { Prisma } from 'entgamers-database/lib/prismaClient'
import { NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'
import { ValidationError } from 'yup'

export const handleError = (error: unknown): Response => {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  } else if (error instanceof AppwriteException) {
    return NextResponse.json({ error: error.message }, { status: error.code ?? 500 })
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // "Unique constraint failed on the {constraint}"
      case 'P2004': // "A constraint failed on the database: {database_error}"
      case 'P2005': // "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type"
      case 'P2006': // "The provided value {field_value} for {model_name} field {field_name} is not valid"
      case 'P2007': // "Data validation error {database_error}"
      case 'P2008': // "Failed to parse the query {query_parsing_error} at {query_position}"
      case 'P2009': // "Failed to validate the query: {query_validation_error} at {query_position}"
      case 'P2010': // "Raw query failed. Code: {code}. Message: {message}"
      case 'P2011': // "Null constraint violation on the {constraint}"
      case 'P2012': // "Missing a required value at {path}"
      case 'P2013': // "Missing the required argument {argument_name} for field {field_name} on {object_name}."
      case 'P2017': // "The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected."
      case 'P2019': // "Input error. {details}"
      case 'P2020': // "Value out of range for the type. {details}"
        return NextResponse.json({ error: error.message }, {
          status: 400
        })
      case 'P2003': // "Foreign key constraint failed on the field: {field_name}"
      case 'P2015': // "A related record could not be found. {details}"
      case 'P2018': // "The required connected records were not found. {details}"
      case 'P2025': // "An operation failed because it depends on one or more records that were required but not found. {cause}"
        return NextResponse.json({ error: error.message }, {
          status: 404
        })
      case 'P2014': // "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models."
        return NextResponse.json({ error: error.message }, {
          status: 409
        })
      case 'P2016': // "Query interpretation error. {details}"
      case 'P2021': // "The table {table} does not exist in the current database."
      case 'P2022': // "The column {column} does not exist in the current database."
      case 'P2023': // "Inconsistent column data: {message}"
      case 'P2024': // "Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})"
      case 'P2026': // "The current database provider doesn't support a feature that the query used: {feature}"
      case 'P2027': // "Multiple errors occurred on the database during query execution: {errors}"
      case 'P2028': // "Transaction API error: {error}"
      case 'P2029': //
      case 'P2030': // "Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema"
      case 'P2031': // "Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set"
      case 'P2032': //
      case 'P2033': // "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers"
      case 'P2034': // "Transaction failed due to a write conflict or a deadlock. Please retry your transaction"
      {
        console.error(`Prisma error with code: ${error.code}`, error)
        return NextResponse.json({ error: 'Internal server error' }, {
          status: 500
        })
      }
      default:
        console.error(`Unknown error with code: ${error.code}`, error)
        return NextResponse.json({ error: 'Internal server error' }, {
          status: 500
        })
    }
  } else {
    console.error('Unknown error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
