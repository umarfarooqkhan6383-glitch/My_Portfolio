import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

const contacts = [
	{
		id: 1,
		name: 'Bhakkar,   Pakistan',
		icon: <FiMapPin />,
	},
	{
		id: 2,
		name: 'fullstackstudio1@gmail.com',
		icon: <FiMail />,
	},
	{
		id: 3,
		name: '+923498336081',
		icon: <FiPhone />,
	},
];

const ContactDetails = () => {
	return (
  <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 py-10 lg:p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Contact Details
      </h2>

      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex items-center p-3 rounded-xl  dark:hover:bg-gray-800 transition"
          >
            <span className="text-2xl text-indigo-500 mr-4">{contact.icon}</span>
            <span className="text-lg text-gray-700 dark:text-gray-200">
              {contact.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);




};

export default ContactDetails;
