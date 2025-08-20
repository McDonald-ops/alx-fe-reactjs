import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold">Form Handling in React</h1>
          <p className="text-sm text-gray-600">Controlled components vs Formik + Yup</p>
        </header>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Controlled Registration Form</h2>
          <RegistrationForm />
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Formik Registration Form (with Yup)</h2>
          <FormikForm />
        </section>
      </div>
    </div>
  );
}

export default App;
