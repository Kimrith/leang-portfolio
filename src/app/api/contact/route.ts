import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production with Resend/Sendgrid, send actual email here:
    // e.g. await resend.emails.send({ ... })
    // For now, log the submission gracefully and return success:
    console.log("New Project Inquiry Received:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Expect a response within 24 hours.",
        data: {
          name: validatedData.name,
          email: validatedData.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred. Please reach out directly via email.",
      },
      { status: 500 }
    );
  }
}
