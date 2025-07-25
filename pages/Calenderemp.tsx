import React, { useState, useMemo } from "react";
import {
  Box,
  Text,
  Input,
  Select,
  Stack,
  HStack,
  Button,
  Badge,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiDownload, FiPrinter } from "react-icons/fi";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const categoryColors = {
  Public: "purple",
  Religious: "green",
  Optional: "blue",
  Company: "orange",
};

const allYears = Array.from({ length: 31 }, (_, i) => 2000 + i);

const holidays = [
  { date: "2025-01-01", name: "New Year’s Day", category: "Public" },
  { date: "2025-01-13", name: "Bhogi", category: "Religious"},
  { date: "2025-01-14", name: "Sankranti / Pongal", category: "Religious" },
  { date: "2025-01-26", name: "Republic Day", category: "Public" },
  { date: "2025-02-26", name: "Maha Shivaratri", category: "Religious"},
  { date: "2025-03-14", name: "Holi", category: "Public" },
  { date: "2025-03-30", name: "Ugadi", category: "Religious"},
  { date: "2025-03-31", name: "Idul Fitr (Ramzan)", category: "Religious"},
  { date: "2025-04-05", name: "Babu Jagjivan Ram Jayanti", category: "Optional" },
  { date: "2025-04-06", name: "Ram Navami", category: "Religious" },
  { date: "2025-04-14", name: "Dr. B.R. Ambedkar Jayanti", category: "Public" },
  { date: "2025-04-18", name: "Good Friday", category: "Religious"},
  { date: "2025-06-07", name: "Eid al-Adha (Bakrid)", category: "Religious" },
  { date: "2025-07-06", name: "Muharram", category: "Religious"},
  { date: "2025-07-21", name: "Bonalu", category: "Religious"},
  { date: "2025-08-15", name: "Independence Day", category: "Public" },
  { date: "2025-08-16", name: "Janmashtami", category: "Religious"},
  { date: "2025-08-27", name: "Ganesh Chaturthi", category: "Religious" },
  { date: "2025-09-05", name: "Eid e Milad", category: "Religious"},
  { date: "2025-09-21", name: "Bathukamma (First Day)", category: "Religious"},
  { date: "2025-10-02", name: "Gandhi Jayanti / Vijaya Dashami", category: "Public" },
  { date: "2025-10-20", name: "Deepavali", category: "Religious"},
  { date: "2025-11-05", name: "Kartika Purnima / Guru Nanak Jayanti", category: "Religious" },
  { date: "2025-12-25", name: "Christmas Day", category: "Religious", religion: "Christian" },
  { date: "2025-12-26", name: "Boxing Day", category: "Optional" },
];

export default function Calendaremp() {
  const [year, setYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const bg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const holidaysForYear = holidays
    .filter((h) => new Date(h.date).getFullYear() === year)
    .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const holidaysByMonth = useMemo(() => {
    return holidaysForYear.reduce((acc: Record<number,typeof holidays>, h) => {
      const month = new Date(h.date).getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(h);
      return acc;
    }, {} as Record<number, typeof holidays>);
  }, [holidaysForYear]);

  const handleExport = () => {
    const csv = holidaysForYear
      .map((h) => {
        const date = new Date(h.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return `${date},${h.name},${h.category}`;
      })
      .join("\n");

    const blob = new Blob([`Date,Name,Category\n${csv}`], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Telangana_Holidays_${year}.csv`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box maxW="960px" mx="auto" p={4} rounded="lg" shadow="xl" bg={bg} color={textColor}>
      <Stack
        direction={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        align="center"
        justify="space-between"
        position="sticky"
        top="0"
        zIndex={1}
        bg={bg}
        p={3}
        mb={4}
        shadow="md"
        borderRadius="md"
        className="no-print"
      >
        <Input
          placeholder="Search holidays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
        <HStack spacing={3} flexWrap="wrap">
  <Box minW="120px">
    <Select
      value={year}
      onChange={(e) => setYear(Number(e.target.value))}
      size="md"
    >
      {allYears.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </Select>
  </Box>

  <Button
    leftIcon={<FiDownload />}
    colorScheme="teal"
    onClick={handleExport}
    size="md"
    flexShrink={0}
  >
    Export CSV
  </Button>
</HStack>
      </Stack>

      {Object.keys(holidaysByMonth)
        .sort((a, b) => Number(a) - Number(b))
        .map((monthIndex) => {
          const month = parseInt(monthIndex);
          const items = holidaysByMonth[month];

          return (
            <Box key={month} mb={8}>
              <Text fontSize="xl" fontWeight="bold" mb={3}>
                {monthNames[month]}
              </Text>
              <Stack direction="column" spacing={4}>
                {items.map((holiday) => {
                  const isToday = holiday.date === today;
                
                  return (
                    <Box
                      key={holiday.date}
                      bg={cardBg}
                      p={4}
                      rounded="lg"
                      shadow="sm"
                      borderLeft="5px solid"
                      borderColor={`${categoryColors[holiday.category as keyof typeof categoryColors]}.400`}
                    >
                      <HStack justify="space-between" flexWrap="wrap">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="lg">
                            {holiday.name}
                          </Text>
                          <Text fontSize="sm">
                            📅 {new Date(holiday.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                            {isToday && (
                              <Badge colorScheme="purple" ml={2}>
                                Today
                              </Badge>
                            )}
                          </Text>
                        </VStack>
                        <Badge
                          colorScheme={categoryColors[holiday.category as keyof typeof categoryColors]}
                          fontSize="sm"
                          whiteSpace="nowrap"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                       {holiday.category}
                        </Badge>
                      </HStack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          );
        })}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-container { background: white !important; color: black !important; box-shadow: none; }
        }
      `}</style>
    </Box>
  );
}
