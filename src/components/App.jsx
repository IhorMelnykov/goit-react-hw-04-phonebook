import { useState } from "react";
import { useLocalStorage } from "./hooks/Hooks";
import { Form } from "./Form/Form";
import { Filter } from "components/Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";
import { Section, Title, Text } from "./App.styled";

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

 const handleSubmit = data => {
   if (contacts.find(contact => contact.name === data.name)) {
     alert(`${data.name} is already in contacts`);
     return;
   }
     setContacts(prevState =>  [...prevState, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  return filteredContacts; 
  };

  const deleteContacts = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };


  return (
    <Section>
      <Title>Phonebook</Title>
      <Form onSubmit={handleSubmit}/>
      <Title>Contacts</Title>
      {contacts.length !== 0 ?
       <>
      <Filter value={filter} onChange={changeFilter}/>
      <ContactsList contacts={filteredContacts()} onDeleteContact={deleteContacts} />
       </> : 
      <Text>There are no saved contacts!</Text>
      }
    </Section>
  );
};