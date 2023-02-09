import { Form } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { fetchContacts, addContact } from 'redux/Opeations';
import { check } from 'redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';

export const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.entities);
  const filter = useSelector(state => state.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      dispatch(addContact({ id: nanoid(5), name: newName, phone: newNumber }));
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

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {isLoading && <Loader />}
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={formHandler} />
        <Filter filter={filter} handleChange={onChange} />
        <h2>Contacts</h2>

        {error && <div>{error}</div>}
        {filter !== '' ? (
          <ContactList data={filterHandler()} />
        ) : (
          <ContactList data={contacts} />
        )}
      </div>
    </div>
  );
};
