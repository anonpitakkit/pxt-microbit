/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=351 weight=30
namespace pins {
    /**
     * Re-maps a number from one range to another. That is, a value of ``from low`` would get mapped to ``to low``, a value of ``from high`` to ``to high``, values in-between to values in-between, etc.
     * @param value value to map in ranges
     * @param fromLow the lower bound of the value's current range
     * @param fromHigh the upper bound of the value's current range, eg: 1023
     * @param toLow the lower bound of the value's target range
     * @param toHigh the upper bound of the value's target range, eg: 4
     */
    //% help=pins/map weight=15
    //% blockId=math_map block="map %value|from low %fromLow|from high %fromHigh|to low %toLow|to high %toHigh"
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }

    /**
     * Read one number from 7-bit I2C address.
     */
    export function i2cReadNumber(address: number, format: NumberFormat): number {
        let buf = pins.i2cReadBuffer(address, pins.sizeOf(format))
        return buf.getNumber(format, 0)
    }

    /**
     * Write one number to a 7-bit I2C address.
     */
    export function i2cWriteNumber(address: number, value: number, format: NumberFormat): void {
        let buf = createBuffer(pins.sizeOf(format))
        buf.setNumber(format, 0, value)
        pins.i2cWriteBuffer(address, buf)
    }

    /**
     * Get the size in bytes of specified number format.
     */
    export function sizeOf(format: NumberFormat) {
        switch (format) {
            case NumberFormat.Int8LE:
            case NumberFormat.UInt8LE:
            case NumberFormat.Int8BE:
            case NumberFormat.UInt8BE:
                return 1;
            case NumberFormat.Int16LE:
            case NumberFormat.UInt16LE:
            case NumberFormat.Int16BE:
            case NumberFormat.UInt16BE:
                return 2;
            case NumberFormat.Int32LE:
            case NumberFormat.Int32BE:
                return 4;
        }
        return 0;
    }
}


interface Buffer {
    [index: number]: number;
    // rest defined in buffer.cpp
}
