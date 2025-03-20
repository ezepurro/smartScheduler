import { useEffect, useState } from 'react';
import { useAppointments } from '../../hooks/useAppointments';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";
import PhoneInput from 'react-phone-input-2';
import useForm from '../../hooks/useForm';
import useAuthStore from '../../store/useAuthStore';
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { useServices } from '../../hooks/useServices';
import { findTimeIntervals } from '../../helpers/findTimeIntervals';
registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
    serviceId: '',
};

const service = ''
const ammount = 2
const timeIntervals = await findTimeIntervals(service,ammount);

const BookAppointment = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [minTime, setMinTime] = useState(9);
    const [maxTime, setMaxTime] = useState(18);
    
    const { formState, onInputChange, isFormValid, dateValid, contactValid } = useForm(appointmentFormFields);
    const { contact, date } = formState;
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();
    const { getAllServices } = useServices();

    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await getAllServices();
            setServices(fetchedServices);
        };

        fetchServices();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid && date && selectedService) {
            addAppointment({ 
                contact, 
                date, 
                userId: user.uid, 
                status: "pending", 
                serviceId: selectedService 
            });
        } else {
            console.log('Formulario no válido');
        }
    };

    return (
        <div className="mt-20 border p-5 rounded-4xl">
            <h4 className='mb-5 text-xl font-bold'>Sacar un turno</h4>
            <hr />
            <form onSubmit={handleSubmit} className='p-10'>
                <div className='mb-4'>
                    <PhoneInput
                        country={'ar'}
                        value={contact}
                        onBlur={() => setIsTouched(true)}
                        onChange={(value) => onInputChange({ target: { name: 'contact', value } })}
                        inputProps={{
                            name: 'contact',
                            required: true,
                        }}
                        placeholder='Número de contacto'
                        enableSearch={true}
                        autoFormat={false}
                        isValid={(value) => {
                            if (!isTouched) return true;
                            const phone = parsePhoneNumberFromString(value.startsWith("+") ? value : `+${value}`);
                            return phone?.isValid() || false;
                        }}
                        id="phone-input"
                        inputClass="py-4 px-3 w-full border rounded-lg text-black"
                        containerClass="w-full"
                        dropdownClass="bg-white border rounded-lg shadow-lg text-black"
                    />
                </div>

                {/* Select de servicios */}
                <div className="mb-4">
                    <label htmlFor="service-select" className="block font-semibold">Seleccionar servicio</label>
                    <select
                        id="service-select"
                        name="serviceId"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="border rounded-lg p-3 w-full"
                        required
                    >
                        <option value="">Seleccione un servicio</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <DatePicker
                        selected={date}
                        onChange={(date) => onInputChange({ target: { name: 'date', value: date } })}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        timeIntervals={timeIntervals}
                        onKeyDown={(e) => { e.preventDefault(); }}
                        minDate={new Date()}
                        name='date'
                        className='border rounded-lg p-3 w-full'
                        withPortal
                        minTime={setHours(setMinutes(new Date(), 0), minTime)}
                        maxTime={setHours(setMinutes(new Date(), 0), maxTime)}
                        id="date-input"
                    />
                    {dateValid && <span className="text-red-500">{dateValid}</span>}
                </div>

                <button 
                    type="submit" 
                    className='border px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300 cursor-pointer w-full'
                >
                    Reservar turno
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;
