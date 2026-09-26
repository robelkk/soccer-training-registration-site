"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type FormFields = { parentName: string; email: string; phone: string; childName: string; childAge: string; program: string; notes: string };

export default function RegistrationForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) { setStatus("error"); setMessage("Please confirm that you are the child’s parent or guardian."); return; }
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(form.entries()) as FormFields;
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/registrations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, consent }) });
      const data = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok) throw new Error(data.message || "Registration could not be submitted.");
      setStatus("success"); setMessage("Registration received! We’ll contact you to confirm the best available session.");
      event.currentTarget.reset(); setConsent(false);
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again."); }
  }

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool?: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "start_child_registration", title: "Start child registration", description: "Open the soccer training registration form and select a program when provided.",
      inputSchema: { type: "object", properties: { program: { type: "string", enum: ["Rookie Kickers", "Skill Builders", "Next Level"] } }, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input: { program?: string }) { document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" }); const select = document.querySelector<HTMLSelectElement>('select[name="program"]'); if (select && input.program) { select.value = input.program; select.dispatchEvent(new Event("change", { bubbles: true })); } return { opened: true, program: input.program || null }; }
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  if (status === "success") return <div className="success-card" role="status"><span><PartyPopper/></span><p className="kicker">You’re on the list</p><h3>Thank you for registering.</h3><p>{message}</p><Button onClick={() => setStatus("idle")} variant="outline">Register another child</Button></div>;

  return (
    <form className="registration-form" onSubmit={submitRegistration}>
      <div className="form-heading"><span>Player registration</span><small>All fields marked * are required</small></div>
      <div className="field-grid">
        <div className="field"><Label htmlFor="parentName">Parent/guardian name *</Label><Input id="parentName" name="parentName" required autoComplete="name" /></div>
        <div className="field"><Label htmlFor="email">Email address *</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><Label htmlFor="phone">Phone number *</Label><Input id="phone" name="phone" type="tel" required autoComplete="tel" /></div>
        <div className="field"><Label htmlFor="childName">Child’s first name *</Label><Input id="childName" name="childName" required autoComplete="off" /></div>
        <div className="field"><Label htmlFor="childAge">Child’s age *</Label><Input id="childAge" name="childAge" type="number" min="5" max="15" required /></div>
        <div className="field"><Label htmlFor="program">Preferred program *</Label><NativeSelect id="program" name="program" required defaultValue="" className="h-11 w-full"><NativeSelectOption value="" disabled>Select a program</NativeSelectOption><NativeSelectOption>Rookie Kickers</NativeSelectOption><NativeSelectOption>Skill Builders</NativeSelectOption><NativeSelectOption>Next Level</NativeSelectOption></NativeSelect></div>
      </div>
      <div className="field"><Label htmlFor="notes">Anything we should know? <span>(optional)</span></Label><textarea id="notes" name="notes" rows={3} placeholder="Experience level, goals, or scheduling notes" /></div>
      <div className="consent-row"><Checkbox id="consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)} /><Label htmlFor="consent">I am this child’s parent or legal guardian and agree to be contacted about training.</Label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <Button className="submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? <><Loader2 className="animate-spin"/> Sending…</> : "Request a training spot"}</Button>
      <p className="privacy-note">We only use this information to respond to your training request.</p>
    </form>
  );
}
