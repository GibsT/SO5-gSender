import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

import gamepad from 'app/lib/gamepad';

export const useGamepadListener = ({ profile } = {}) => {
    const [buttons, setButtons] = useState([]);
    const [axes, setAxes] = useState(null);

    useEffect(() => {
        gamepad.start();

        gamepad.on('gamepad:button', gamepadListener);
        gamepad.on('gamepad:axis', axisListener);

        return () => {
            gamepad.removeEventListener('gamepad:button', gamepadListener);
            gamepad.removeEventListener('gamepad:axis', axisListener);
        };
    }, []);

    const gamepadListener = ({ detail }) => {
        const { gamepad } = detail;

        if (profile && !profile.includes(gamepad.id)) {
            return;
        }

        setButtons(gamepad.buttons);
        setAxes(gamepad.axes);
    };

    const axisListener = throttle(({ detail }) => {
        const { gamepad } = detail;

        if (profile && !profile.includes(gamepad.id)) {
            return;
        }

        setAxes(gamepad.axes);
    }, 250, { trailing: false });

    return { buttons, axes };
};