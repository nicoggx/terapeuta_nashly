import './Register.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import StepOneRegister from '../../components/RegisterSteps/StepOne/StepOneRegister';
import StepTwoRegister from '../../components/RegisterSteps/StepTwo/StepTwoRegister';
import { register } from '../../service/auth/auth';
import { encrypt } from '../../util/sha512';
import { activateLoading, desactiveLoading } from '../../modules/auth/authModule';

function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [steps, setSteps] = useState({
        stepOne: true,
        stepTwo: false,
        stepThree: false,
    });
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [infoUser, setInfoUser] = useState({
        name: '',
        lastname: '',
        rut: '',
        birthday: '',
        email: '',
        password: '',
        repeatPassword: '',
        address: '',
        city: '',
        health: '',
        phone: '',
    });

    const [errorInfoUser, setErrorInfoUser] = useState({
        errorName: false,
        errorLastname: false,
        errorRut: false,
        errorBirthday: false,
        errorEmail: false,
        errorPassword: false,
        errorAddress: false,
        errorCity: false,
        errorHealth: false,
        errorPhone: false,
        errorRepeatPassword: false,
        errorPasswordDiferents: false,
    });

    const cleanState = () => {
        setInfoUser({
            name: '',
            lastname: '',
            rut: '',
            birthday: '',
            email: '',
            password: '',
            repeatPassword: '',
            address: '',
            city: '',
            health: '',
            phone: '',
        });
    };

    useEffect(() => {
        dispatch(desactiveLoading());
    }, [dispatch]);

    const validateForm = () => {
        let validate = true;
        const rut = infoUser.rut.replaceAll('.', '');

        const initial = {
            errorName: false,
            errorLastname: false,
            errorRut: false,
            errorBirthday: false,
            errorEmail: false,
            errorPassword: false,
            errorAddress: false,
            errorCity: false,
            errorHealth: false,
            errorPhone: false,
            errorRepeatPassword: false,
            errorPasswordDiferents: false,
        };
        if (infoUser.name.length <= 2) {
            validate = false;
            initial.errorName = true;
        }

        if (infoUser.lastname.length <= 2) {
            validate = false;
            initial.errorLastname = true;
        }

        if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
            validate = false;
            initial.errorRut = true;
        }

        if (!/\S+@\S+\.\S+/.test(infoUser.email)) {
            validate = false;
            initial.errorEmail = true;
        }

        const birthdayDate = new Date(infoUser.birthday);

        if (
            infoUser.birthday === '' &&
            new Date().getFullYear() - birthdayDate.getFullYear() <= 18
        ) {
            validate = false;
            initial.errorBirthday = true;
        }

        setErrorInfoUser(initial);

        return validate;
    };

    const handleRegisterForm = async () => {
        dispatch(activateLoading('Registrando usuario, un momento porfavor...'));
        try {
            const { data: response, status } = await register({
                email: infoUser.email,
                password: encrypt(infoUser.password),
                data: infoUser,
            });
            if (response) {
                if (status === 200) {
                    history.push('/login');
                }
            } else {
                setShowAlert(true);

                setTimeout(() => {
                    setShowAlert(false);
                }, 8000);
            }
        } catch (e) {
            setErrorMessage(e.message);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 8000);
        }

        dispatch(desactiveLoading());
    };

    const validateFormTwo = () => {
        let validate = true;

        const initial = {
            errorName: false,
            errorLastname: false,
            errorRut: false,
            errorBirthday: false,
            errorEmail: false,
            errorPassword: false,
            errorAddress: false,
            errorCity: false,
            errorHealth: false,
            errorPhone: false,
            errorRepeatPassword: false,
            errorPasswordDiferents: false,
        };
        if (infoUser.city === '') {
            validate = false;
            initial.errorCity = true;
        }
        if (infoUser.address === '') {
            validate = false;
            initial.errorAddress = true;
        }
        if (infoUser.health === '') {
            validate = false;
            initial.errorHealth = true;
        }

        if (infoUser.phone === '' || infoUser.phone.length < 8) {
            validate = false;
            initial.errorPhone = true;
        }
        if (infoUser.password === '' || infoUser.password.length < 6) {
            validate = false;
            initial.errorPassword = true;
        }
        if (infoUser.repeatPassword === '' || infoUser.repeatPassword.length < 6) {
            validate = false;
            initial.errorRepeatPassword = true;
        } else if (infoUser.password !== infoUser.repeatPassword) {
            validate = false;
            initial.errorPasswordDiferents = true;
        }

        setErrorInfoUser(initial);

        return validate;
    };

    const handleNextStep = (stepsHandle) => {
        if (stepsHandle.stepTwo === true) {
            cleanState();
            if (validateForm()) {
                setInfoUser(infoUser);
                setSteps(stepsHandle);
            }
        } else if (stepsHandle.stepOne === true) {
            setSteps(stepsHandle);
        } else if (validateFormTwo()) {
            handleRegisterForm();
        }
    };

    return (
        <div className="registerContainer">
            <div className="registerSubContainer">
                {!steps.stepThree && (
                    <div className="registerTitle">
                        <span>Registro</span>
                    </div>
                )}
                {steps.stepOne && (
                    <StepOneRegister
                        nextStep={handleNextStep}
                        info={infoUser}
                        setInfoUser={setInfoUser}
                        errorInfoUser={errorInfoUser}
                        setErrorInfoUser={setErrorInfoUser}
                    />
                )}
                {steps.stepTwo && (
                    <StepTwoRegister
                        nextStep={handleNextStep}
                        info={infoUser}
                        setInfoUser={setInfoUser}
                        setErrorInfoUser={setErrorInfoUser}
                        errorInfoUser={errorInfoUser}
                    />
                )}
                {steps.stepThree && (
                    <div className="userCreatedContainer">
                        <AiOutlineCheckCircle size="60" color="#198754" />
                        <span>Usuario creado correctamente !</span>
                    </div>
                )}
                {showAlert && (
                    <div className="containerAlert">
                        <Alert
                            variant="danger"
                            onClose={() => setShowAlert(false)}
                            dismissible>
                            <Alert.Heading>
                                Ha ocurrido un error al registrar el usuario
                            </Alert.Heading>
                            <p>{errorMessage}</p>
                        </Alert>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
