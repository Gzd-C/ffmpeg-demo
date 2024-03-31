import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './index.css';

const Timetrack: React.FC = () => {
    const { duration } = useSelector((state:any) => state.common)
    const [ticks, setTicks] = useState([] as any[])
    useEffect(() => {
        const tmp = Math.ceil(duration)
        console.log('tmp', tmp)
        const tmpTicks = []
        for (let i = 0; i < tmp; i++) {
            tmpTicks.push(i)
        }
        setTicks([...tmpTicks])
    }, [duration])
    return (
        <>
            <div className="timeline">
            <div className="scrubber"></div>
            {
                ticks.map((tick) => {
                    return (
                        <div className='ticks-wrapper'>
                            <div className={tick % 5 === 0 ? 'tick-number' : 'tick'} />
                            <div className='number'>{tick % 5 === 0 ? tick : null}</div>
                        </div>
                    )
                })
            }
            </div>
        </>
    );
}

export default Timetrack