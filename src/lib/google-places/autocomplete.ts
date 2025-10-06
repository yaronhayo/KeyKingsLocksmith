/**
 * Google Places Autocomplete utility
 * Provides address autocomplete functionality using Google Places API
 */

// Load Google Maps API script
export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
      return;
    }

    // Get API key from environment
    const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key not found. Address autocomplete will not work.');
      reject(new Error('Google Maps API key not configured'));
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));

    document.head.appendChild(script);
  });
}

export interface AddressComponents {
  streetNumber?: string;
  route?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  fullAddress?: string;
}

export interface AutocompleteOptions {
  componentRestrictions?: { country: string | string[] };
  types?: string[];
  fields?: string[];
}

/**
 * Initialize Google Places Autocomplete on an input element
 * @param input - The input element to attach autocomplete to
 * @param onPlaceSelected - Callback when a place is selected
 * @param options - Autocomplete configuration options
 */
export async function initializeAutocomplete(
  input: HTMLInputElement,
  onPlaceSelected: (address: AddressComponents) => void,
  options: AutocompleteOptions = {}
): Promise<google.maps.places.Autocomplete | null> {
  try {
    // Load Google Maps API
    await loadGoogleMapsScript();

    // Default options for US addresses
    const defaultOptions: AutocompleteOptions = {
      componentRestrictions: { country: 'us' },
      types: ['address'],
      fields: ['address_components', 'formatted_address', 'geometry'],
    };

    const mergedOptions = { ...defaultOptions, ...options };

    // Create autocomplete instance
    const autocomplete = new google.maps.places.Autocomplete(input, mergedOptions);

    // Listen for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.address_components) {
        console.warn('No address components found for selected place');
        return;
      }

      // Parse address components
      const addressData: AddressComponents = {
        fullAddress: place.formatted_address,
      };

      place.address_components.forEach((component) => {
        const types = component.types;

        if (types.includes('street_number')) {
          addressData.streetNumber = component.long_name;
        }
        if (types.includes('route')) {
          addressData.route = component.long_name;
        }
        if (types.includes('locality')) {
          addressData.city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          addressData.state = component.short_name;
        }
        if (types.includes('postal_code')) {
          addressData.zipCode = component.long_name;
        }
        if (types.includes('country')) {
          addressData.country = component.short_name;
        }
      });

      // Call the callback with parsed address data
      onPlaceSelected(addressData);
    });

    return autocomplete;
  } catch (error) {
    console.error('Failed to initialize Google Places Autocomplete:', error);
    return null;
  }
}

/**
 * Format address components into a single string
 */
export function formatAddress(address: AddressComponents): string {
  const parts: string[] = [];

  if (address.streetNumber && address.route) {
    parts.push(`${address.streetNumber} ${address.route}`);
  } else if (address.route) {
    parts.push(address.route);
  }

  if (address.city) {
    parts.push(address.city);
  }

  if (address.state && address.zipCode) {
    parts.push(`${address.state} ${address.zipCode}`);
  } else if (address.state) {
    parts.push(address.state);
  }

  return parts.join(', ');
}

/**
 * Destroy autocomplete instance and clean up
 */
export function destroyAutocomplete(autocomplete: google.maps.places.Autocomplete | null) {
  if (autocomplete) {
    google.maps.event.clearInstanceListeners(autocomplete);
  }
}
