'use client';

import React, { useTransition } from 'react';
import { deleteContact } from '@/data/actions/deleteContact';
import SubmitButton from '@/components/ui/SubmitButton';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [, startTransition] = useTransition();
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <form
      action={deleteContactById}
      onSubmit={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(async () => {
          await deleteContact(contactId);
        });
      }}
    >
      <SubmitButton theme="destroy">
        Delete
      </SubmitButton>
    </form>
  );
}
