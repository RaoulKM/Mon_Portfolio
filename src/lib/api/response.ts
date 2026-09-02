import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** Consistent JSON envelopes for Route Handlers (spec §40). */

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function created<T>(data: T) {
  return NextResponse.json({ data }, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function fail(
  message: string,
  status = 400,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json({ error: { message, ...extra } }, { status });
}

export const unauthorized = () => fail("Non authentifié", 401);
export const forbidden = () => fail("Accès refusé", 403);
export const notFound = (what = "Ressource") => fail(`${what} introuvable`, 404);
export const conflict = (message = "Conflit") => fail(message, 409);
export const tooManyRequests = () => fail("Trop de requêtes", 429);

export function fromZodError(err: ZodError) {
  return NextResponse.json(
    { error: { message: "Validation échouée", fields: err.flatten().fieldErrors } },
    { status: 422 },
  );
}

export function serverError(err?: unknown) {
  if (err) console.error("[api] unhandled error", err);
  return fail("Erreur interne du serveur", 500);
}
