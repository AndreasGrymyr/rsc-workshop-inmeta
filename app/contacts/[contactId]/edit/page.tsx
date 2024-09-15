import { getContact } from '@/data/services/getContact';
import ContactForm from './_components/ContactForm';
import { ErrorBoundary } from 'react-error-boundary';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function EditContactPage({ params }: PageProps) {
  const contact = await getContact(params.contactId);

  return (
      <ContactForm contact={contact} />
  );
}
