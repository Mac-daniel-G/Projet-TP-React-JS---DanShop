/**
 * Configuration globale pour les tests
 * Initialise les matchers personnalisés de testing-library/jest-dom
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Étend les matchers de Vitest avec ceux de jest-dom
expect.extend(matchers);

// Nettoie le DOM après chaque test
afterEach(() => {
  cleanup();
});

// Note: jsdom fournit déjà localStorage
// On nettoie simplement localStorage avant chaque test dans beforeEach de chaque fichier de test
