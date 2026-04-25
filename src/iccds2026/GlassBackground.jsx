import React from 'react';

/**
 * Lightweight animated background — pure CSS.
 * Replaces the heavy React Three Fiber scene for dramatically better performance.
 */
const GlassBackground = () => {
    return (
        <div className="iccds-bg-wrap" aria-hidden="true">
            {/* Gradient orbs — GPU-composited via transform/opacity only */}
            <div className="iccds-bg-orb iccds-bg-orb-1" />
            <div className="iccds-bg-orb iccds-bg-orb-2" />
            <div className="iccds-bg-orb iccds-bg-orb-3" />
            <div className="iccds-bg-orb iccds-bg-orb-4" />
        </div>
    );
};

export default GlassBackground;
