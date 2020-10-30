/**
Get and Set values in JSON data objects
Uses dot notation to access members of the object graph
e.g.
const name = PropertyPathResolver.getValue(person, "name")
const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
*/
export declare class PropertyPathResolver {
    /**
    Get values in JSON data objects using dot notation to access members of the object graph
    e.g.
    const name = PropertyPathResolver.getValue(person, "name")
    const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
    */
    static getValue(data: any, dataName: string): any;
    /**
    Set values in JSON data objects using dot notation to access members of the object graph
    e.g.
    PropertyPathResolver.setValue(person, "name", "Dave")
    PropertyPathResolver.setValue(person, "addresses.0.title", "home")
    */
    static setValue(data: any, dataName: string, value: any): void;
}
