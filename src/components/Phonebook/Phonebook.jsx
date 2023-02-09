import { Form } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { add, remove, check } from 'redux/Slices';
import { useDispatch, useSelector } from 'react-redux';

export const Phonebook = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const formHandler = (newName, newNumber) => {
    let isAdded = false;

    contacts.map(contact => {
      if (newName.toLowerCase() === contact.name.toLowerCase()) {
        alert(`${newName} is already in contacts!`);
        isAdded = true;
        return contact;
      }
      return contact;
    });
    if (isAdded !== true) {
      dispatch(add({ id: nanoid(5), name: newName, number: newNumber }));
    }
  };

  const onChange = event => {
    dispatch(check(event.currentTarget.value));
    filterHandler();
  };

  const filterHandler = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const deleteContact = contactId => {
    dispatch(remove(contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formHandler} />
      <Filter filter={filter} handleChange={onChange} />
      <h2>Contacts</h2>

      {filter !== '' ? (
        <ContactList data={filterHandler()} deleteContact={deleteContact} />
      ) : (
        <ContactList data={contacts} deleteContact={deleteContact} />
      )}
    </div>
  );
};
