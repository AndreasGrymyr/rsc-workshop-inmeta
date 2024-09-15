import 'server-only';

import { notFound } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

export const getContact = cache(async (contactId: string) => {
  console.log('getContact', contactId);
  await slow();

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }

  return contact;
});

// export const getContact = unstable_cache(
//   async (contactId: string) => {
//     return getContactDedupe(contactId);
//   },
//   ['contact'],
//   {
//     tags: ['contact'],
//   },
// );
