import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  VStack,
  Select,
  Flex,
  IconButton,
  useColorModeValue,
  Badge,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  DollarSign,
  Calendar,
  RefreshCw,
} from 'lucide-react';

const MachinerySearch = ({ onSearch, onFilterChange, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: initialFilters?.type || '',
    location: initialFilters?.location || '',
    priceRange: initialFilters?.priceRange || '',
    availability: initialFilters?.availability || '',
    powerSource: initialFilters?.powerSource || '',
    sortBy: initialFilters?.sortBy || 'relevance',
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const machineryTypes = [
    'Tractor',
    'Harvester',
    'Plough',
    'Seeder',
    'Irrigation System',
    'Sprayer',
    'Cultivator',
    'Loader',
    'Balers',
    'Other',
  ];

  const powerSources = ['Diesel', 'Electric', 'Solar', 'Manual', 'Hybrid'];
  const priceRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $20,000',
    '$20,000 - $50,000',
    'Above $50,000',
  ];
  const locations = [
    'Nearby',
    'Same State',
    'Anywhere',
    'North Region',
    'South Region',
    'East Region',
    'West Region',
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, filters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      location: '',
      priceRange: '',
      availability: '',
      powerSource: '',
      sortBy: 'relevance',
    };
    setFilters(resetFilters);
    setSearchTerm('');
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const quickFilters = [
    { label: 'Available Today', key: 'availability', value: 'today' },
    { label: 'Under $5k', key: 'priceRange', value: '$1,000 - $5,000' },
    { label: 'Electric', key: 'powerSource', value: 'Electric' },
    { label: 'Nearby', key: 'location', value: 'Nearby' },
  ];

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      p={6}
      boxShadow="sm"
    >
      <VStack spacing={6} align="stretch">
        {/* Main Search Bar */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
            Find Agricultural Machinery
          </Text>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Search size={20} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search for tractors, harvesters, irrigation systems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              pr="120px"
            />
            <Button
              position="absolute"
              right="1"
              top="1"
              size="md"
              colorScheme="green"
              onClick={handleSearch}
              zIndex={1}
            >
              Search
            </Button>
          </InputGroup>
        </Box>

        {/* Quick Filters */}
        <Box>
          <Flex align="center" gap={2} mb={3}>
            <Filter size={16} />
            <Text fontSize="sm" fontWeight="medium">
              Quick Filters
            </Text>
          </Flex>
          <HStack spacing={3} flexWrap="wrap">
            {quickFilters.map((filter, index) => (
              <Badge
                key={index}
                px={3}
                py={1}
                borderRadius="full"
                cursor="pointer"
                colorScheme={
                  filters[filter.key] === filter.value ? 'green' : 'gray'
                }
                onClick={() => handleFilterChange(filter.key, filter.value)}
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s"
              >
                {filter.label}
              </Badge>
            ))}
          </HStack>
        </Box>

        {/* Advanced Filters */}
        <Box>
          <Flex align="center" justify="space-between" mb={4}>
            <Flex align="center" gap={2}>
              <SlidersHorizontal size={16} />
              <Text fontSize="sm" fontWeight="medium">
                Advanced Filters
              </Text>
            </Flex>
            <IconButton
              icon={<RefreshCw size={16} />}
              size="sm"
              variant="ghost"
              onClick={handleReset}
              aria-label="Reset filters"
            />
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {/* Machinery Type */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                Machinery Type
              </Text>
              <Select
                size="sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                placeholder="All Types"
              >
                {machineryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Location */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                <Flex align="center" gap={1}>
                  <MapPin size={12} />
                  Location
                </Flex>
              </Text>
              <Select
                size="sm"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Any Location"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Price Range */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                <Flex align="center" gap={1}>
                  <DollarSign size={12} />
                  Price Range
                </Flex>
              </Text>
              <Select
                size="sm"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                placeholder="Any Price"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Power Source */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                Power Source
              </Text>
              <Select
                size="sm"
                value={filters.powerSource}
                onChange={(e) => handleFilterChange('powerSource', e.target.value)}
                placeholder="All Power Sources"
              >
                {powerSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Availability */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                <Flex align="center" gap={1}>
                  <Calendar size={12} />
                  Availability
                </Flex>
              </Text>
              <Select
                size="sm"
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                placeholder="Any Time"
              >
                <option value="today">Available Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Date</option>
              </Select>
            </Box>

            {/* Sort By */}
            <Box>
              <Text fontSize="xs" fontWeight="medium" mb={1} color="gray.500">
                Sort By
              </Text>
              <Select
                size="sm"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="distance">Distance</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </Select>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Active Filters Display */}
        {(Object.values(filters).some(value => value) || searchTerm) && (
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Active Filters
            </Text>
            <HStack spacing={2} flexWrap="wrap">
              {searchTerm && (
                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  Search: {searchTerm}
                  <Box
                    as="span"
                    cursor="pointer"
                    onClick={() => setSearchTerm('')}
                    ml={1}
                  >
                    ×
                  </Box>
                </Badge>
              )}
              
              {Object.entries(filters).map(([key, value]) => {
                if (value && key !== 'sortBy') {
                  return (
                    <Badge
                      key={key}
                      colorScheme="green"
                      px={3}
                      py={1}
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      {key}: {value}
                      <Box
                        as="span"
                        cursor="pointer"
                        onClick={() => handleFilterChange(key, '')}
                        ml={1}
                      >
                        ×
                      </Box>
                    </Badge>
                  );
                }
                return null;
              })}
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MachinerySearch;