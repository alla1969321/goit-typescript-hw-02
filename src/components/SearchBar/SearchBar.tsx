import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css"

interface SearchBarProps {
  onSubmit: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (values: { query: string }, actions: any) =>  {
    const formattedSearch = values.query.trim().toLowerCase(); // змінено з 'values.search' на 'values.query'
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={handleSubmit} // використання функції handleSubmit
      >
        <Form className={css.formSearch}>
          <Field
            className={css.input}
            placeholder="Search images and photos"
            type="text"
            name="query"
          />
          <button className={css.btn } type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};


export default SearchBar; 
