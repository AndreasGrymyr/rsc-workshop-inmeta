'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { ContactSchemaErrorType, ContactSchemaType, contactSchema } from '@/validations/contactSchema';

type State = {
  errors?: ContactSchemaErrorType;
  data: ContactSchemaType;
}

export async function updateContact(contactId: string, _prevState: State, formData: FormData) {
  await slow();

  const data = Object.fromEntries(formData);
  const result = contactSchema.safeParse(data);

  if(!result.success) {
    return {
      errors: result.error.formErrors,
      data: data as ContactSchemaType
    }
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  revalidatePath('/');
  redirect(`/contacts/${contactId}`);
}
