import PropTypes from 'prop-types';
import { VscCircleLargeOutline, VscCircleLargeFilled } from 'react-icons/vsc';
import './NavStep.css';

function NavStep({ totalSteps, currentStep, steps }) {
    const dots = [];
    for (let i = 1; i <= totalSteps; i += 1) {
        const isActive = currentStep === i;
        const ok = currentStep < i;
        const title = steps[i - 1] ? steps[i - 1].title : 'a';
        dots.push(
            <li key={i} className="step">
                <div>
                    {ok ? (
                        <VscCircleLargeFilled
                            size="30"
                            className={`dot ${isActive ? 'active' : ''}`}
                        />
                    ) : (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                            {isActive ? (
                                <VscCircleLargeOutline
                                    size="30"
                                    className={`dot ${isActive ? 'active' : ''}`}
                                />
                            ) : (
                                <VscCircleLargeFilled
                                    size="30"
                                    className={`dot ${isActive ? 'active' : ''}`}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="steplabel">
                    <span>{title}</span>
                </div>
            </li>,
        );
    }

    return (
        <div>
            <ul className="nav">{dots}</ul>
        </div>
    );
}

NavStep.defaultProps = {
    totalSteps: 1,
    currentStep: 1,
    steps: [],
};

NavStep.propTypes = {
    totalSteps: PropTypes.number,
    currentStep: PropTypes.number,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
        }),
    ),
};

export default NavStep;
