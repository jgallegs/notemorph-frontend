// frontend/app/api/ocr-notes/route.ts
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.NOTEMORPH_BACKEND_URL;
const backendApiKey = process.env.NOTEMORPH_INTERNAL_API_KEY;

export const runtime = "nodejs"; // por si acaso

export async function POST(req: NextRequest) {
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL no configurada" },
      { status: 500 }
    );
  }

  try {
    // Leemos el form-data que viene del cliente (imágenes)
    const formData = await req.formData();

    const targetUrl = `${backendUrl.replace(/\/$/, "")}/notes/ocr-to-docx`;

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        ...(backendApiKey ? { "x-api-key": backendApiKey } : {}),
      },
      body: formData as any, // TS se pone tiquismiquis
    });

    const text = await res.text();

    // Intentamos parsear JSON, por si el backend manda texto plano en errores
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch {
      return new NextResponse(text, { status: res.status });
    }
  } catch (err) {
    console.error("Error en proxy /api/ocr-notes:", err);
    return NextResponse.json(
      { error: "Error llamando al backend" },
      { status: 500 }
    );
  }
}
