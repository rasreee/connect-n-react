import './Onboarding.css';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useGameInfo, useGameState } from 'stores/hooks';

enum OnboardingStep {
  Players = 'Players',
  BoardSetup = 'BoardSetup',
  Complete = 'Complete',
}

// form for player setup
const PlayerSetup = observer(() => {
  const gameInfo = useGameInfo();

  return (
    <div className='Onboarding_players'>
      <div>Who's playing?</div>
      <div className='Onboarding_inputRow'>
        <input
          type='text'
          defaultValue={gameInfo.playerOneName}
          onBlur={(e) =>
            gameInfo.updateDimensions('cols', parseInt(e.currentTarget.value))
          }
        />
        <input
          type='text'
          defaultValue={gameInfo.playerTwoName}
          onBlur={(e) =>
            gameInfo.updateDimensions('rows', parseInt(e.currentTarget.value))
          }
        />
      </div>
    </div>
  );
});

// form for board setup
const BoardSetup = observer(() => {
  const gameInfo = useGameInfo();
  const { cols, rows } = gameInfo.dimensions;

  return (
    <div className='Onboarding_board'>
      <div>Board dimensions</div>
      <div>
        <div className='Onboarding_inputRow'>
          <input
            type='number'
            defaultValue={cols}
            onBlur={(e) =>
              gameInfo.updateDimensions('cols', parseInt(e.currentTarget.value))
            }
          />
          <div className='Onboarding_board_x'>x</div>
          <input
            type='number'
            defaultValue={rows}
            onBlur={(e) =>
              gameInfo.updateDimensions('rows', parseInt(e.currentTarget.value))
            }
          />
        </div>
      </div>
      <div>How many in a row to win?</div>
      <div className='Onboarding_inputRow'>
        <input
          type='number'
          defaultValue={gameInfo.winNumber}
          onBlur={(e) =>
            runInAction(
              () => (gameInfo.winNumber = parseInt(e.currentTarget.value))
            )
          }
        />
      </div>
    </div>
  );
});

// Component that handles onboarding
export const Onboarding = () => {
  const [currentStep, setStep] = useState(OnboardingStep.Players);

  const gameState = useGameState();

  useEffect(() => {
    if (currentStep === OnboardingStep.Complete) {
      gameState.play();
    }
  }, [currentStep]);

  /* ~~~~~~~~~~~~~~~~
    Updating Current Step
    ~~~~~~~~~~~~~~~~~ */
  const handleReset = () => {
    if (window.confirm('Are you sure? This will erase your game.')) {
      setStep(OnboardingStep.Players);
      gameState.reset();
    }
  };

  /* ~~~~~~~~~~~~~~~~
    Rendering
    ~~~~~~~~~~~~~~~~~ */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case OnboardingStep.Players:
        return <PlayerSetup />;
      case OnboardingStep.BoardSetup:
        return <BoardSetup />;
      case OnboardingStep.Complete:
      default:
        return (
          <div>
            Setup Complete, have fun! (
            <a onClick={handleReset} className='Onboarding_resetLink'>
              reset
            </a>
            )
          </div>
        );
    }
  };

  const renderButtons = () => {
    let prevStep: OnboardingStep | null = null;
    let nextStep: OnboardingStep | null = null;
    let nextStepText = 'Next';

    switch (currentStep) {
      case OnboardingStep.Players:
        nextStep = OnboardingStep.BoardSetup;
        break;
      case OnboardingStep.BoardSetup:
        prevStep = OnboardingStep.Players;
        nextStep = OnboardingStep.Complete;
        nextStepText = 'Done';
        break;
      case OnboardingStep.Complete:
      default:
        break;
    }

    return (
      <div className='Onboarding_buttons'>
        {prevStep && (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <button onClick={() => setStep(prevStep!)}>Back</button>
        )}
        {nextStep && (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <button onClick={() => setStep(nextStep!)}>{nextStepText}</button>
        )}
      </div>
    );
  };

  return (
    <div className='Onboarding'>
      <label className='Onboarding_label'>Game Setup</label>
      {renderCurrentStep()}
      {renderButtons()}
    </div>
  );
};
