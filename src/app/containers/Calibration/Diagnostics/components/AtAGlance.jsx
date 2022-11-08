/*
 * Copyright (C) 2022 Sienci Labs Inc.
 *
 * This file is part of gSender.
 *
 * gSender is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, under version 3 of the License.
 *
 * gSender is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gSender.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact for information regarding this program and its license
 * can be sent through gSender@sienci.com or mailed to the main office
 * of Sienci Labs Inc. in Waterloo, Ontario, Canada.
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import StatusRow from './StatusRow';
import styles from '../index.styl';

const AtAGlance = ({ homing, softLimits, homingLocation, reportInches }) => {
    return (
        <div className={styles.card}>
            <StatusRow label="Homing" value={homing} />
            <StatusRow label="Soft Limits" value={softLimits} />
            <StatusRow label="Home Location" value={homingLocation} />
            <StatusRow label="Report Inches" value={reportInches} />
        </div>
    );
};

export default connect((store) => {
    const settings = get(store, 'controller.settings.settings', {});
    const $13 = get(settings, '$13', '0');
    const $23 = get(settings, '$23', '0');
    const $20 = get(settings, '$20', '0');
    const $22 = get(settings, '$22', '0');

    const getHomingLocation = (mask) => {
        return false;
    };

    const homingLocation = getHomingLocation($23);
    return {
        homing: $22 === '1' ? 'Enabled' : 'Disabled',
        reportInches: $13 === '1' ? 'Enabled' : 'Disabled',
        softLimits: $20 === '1' ? 'Enabled' : 'Disabled',
        homingLocation
    };
})(AtAGlance);