import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import useForm from '../../hooks/useForm'; 
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { es } from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { useAppointments } from '../../hooks/useAppointments';
import useAuthStore from '../../store/useAuthStore';

registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};

const BookAppointment = () => {
    const [isTouched, setIsTouched] = useState(false);
    const [minTime, setMinTime] = useState(9);
    const [maxTime, setMaxTime] = useState(18);

    const { formState, onInputChange, isFormValid, dateValid, contactValid } = useForm(appointmentFormFields);
    const { contact, date } = formState;
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid && date !== '') {
            addAppointment({contact, date, userId:user.uid, status: "pending", serviceId: "67d88f68d1965f79cd567250" });
        } else {
            console.log('Formulario no válido');
        }
    }

    return (
        <div className="mt-20 border p-5 rounded-4xl">
            <h4 className='mb-5 text-xl font-bold'>Sacar un turno</h4>
            <hr />
            <form onSubmit={handleSubmit} className='p-10'>
                <div className='w-10'>
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
                <DatePicker
                    selected={date}
                    onChange={(date) => onInputChange({ target: { name: 'date', value: date } })}
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                    onKeyDown={(e) => { e.preventDefault() }}
                    minDate={new Date()}
                    name='date'
                    className='border rounded-4xl p-5 my-4'
                    withPortal
                    minTime={setHours(setMinutes(new Date(), 0), minTime)} //minTime = 9
                    maxTime={setHours(setMinutes(new Date(), 0), maxTime)} //maxTime = 18
                    id="date-input"
                />
                {dateValid && <span>{dateValid}</span>}
                <button type="submit" className='border px-5 py-3 rounded-4xl hover:bg-white hover:text-black transform duration-300 cursor-pointer'>
                    Reservar turno
                </button>
            </form>
        </div>
    )
}

export default BookAppointment;