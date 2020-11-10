import { startOfHour } from 'date-fns';
import { getCustomRepository }  from 'typeorm';

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
     public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRespository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRespository.findByDate(
            appointmentDate
        );
    
        if (findAppointmentInSameDate){
            throw Error('this hours is already booked');
        };
        
        const appointment = appointmentsRespository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRespository.save(appointment);
    
        return appointment;
    }

}

export default CreateAppointmentService;