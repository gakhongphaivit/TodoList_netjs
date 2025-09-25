export interface ListResponse<T> {
statusCode: number;
data: {
items: T[];
meta: {
limit: number;
offset: number;
total: number;
totalPages: number | null;
};
};
}
export interface ItemResponse<T> {
statusCode: number;
data: {
item: T;
};
}