export declare class DateHelpers {
    static getDaysArrayByMonth(month: number, year: number): string[];
    static getDateParts(date: string, includeDate?: boolean): {
        day: number;
        month: number;
        year: number;
    };
    static areSame(d1: string, d2: string): boolean;
    static getMonthValues(): {
        value: string;
        label: string;
    }[];
    static isBefore(date1: string, date2: string, granularity?: string): boolean;
    static isAfter(date1: string, date2: string, granularity?: string): boolean;
    static isEndOfMonth(date: string): boolean;
    static getYearValues(futureDates: boolean, yearsFromNow?: number): number[];
    static toDateFormat(s: {
        day?: number;
        month?: number;
        year?: number;
    }): string;
    static getTimeParts(time: string): {
        hours: number;
        minutes: number;
    };
}
