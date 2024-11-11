import { View } from "react-native";
import Button from "../buttons/Button";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function Pagination({ onChange, page, totalPages }: PaginationProps) {
    return (
        <View className="flex flex-row gap-2 justify-center mt-4">
           {new Array(totalPages).fill(0).map((_, index) => (
                <Button
                    key={index}
                    onClick={() => onChange(index + 1)}
                    data-testid={`pagination-button-${index}`}
                    variant={page === index + 1 ? 'primary' : 'text'}
                >
                    {index + 1}
                </Button>
           ))}
        </View>
    );
}
