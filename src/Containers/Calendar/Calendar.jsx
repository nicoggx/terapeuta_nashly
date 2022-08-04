import './Calendar.css';
import StepWizard from 'react-step-wizard';
import NavStep from '../../components/NavStep/NavStep';
import { STEPS } from '../../constants/steps';
import Step1 from './step1/step1';
import Step2 from './step2/step2';
import Step3 from './step3/step3';

function Calendar() {
    return (
        <div className="calendar">
            <div className="calendar-header">
                <StepWizard nav={<NavStep steps={STEPS} />}>
                    <Step1 />
                    <Step2 />
                    <Step3 />
                </StepWizard>
            </div>
        </div>
    );
}
export default Calendar;
