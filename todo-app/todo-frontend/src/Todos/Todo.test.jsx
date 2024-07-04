// @vitest-environment jsdom

import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Todo from './Todo';

describe('Todo', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders name', () => {
        const expectedText = 'testing string xyz';
        render(<Todo todo={{ _id: 'a', text: expectedText, done: false }}
            onClickComplete={() => { }}
            onClickDelete={() => { }} />);
        expect(screen.getByText(expectedText)).toBeDefined();
    });

    test('deletes if not done', () => {
        let deleted = false;
        render(<Todo todo={{ _id: 'a', text: 'Testing todo', done: false }}
            onClickComplete={() => () => { }}
            onClickDelete={() => () => { deleted = true }} />);
        expect(deleted).toEqual(false);
        fireEvent.click(screen.getByText('Delete'));
        expect(deleted).toEqual(true);
    });

    test('deletes if done', () => {
        let deleted = false;
        render(<Todo todo={{ _id: 'a', text: 'Testing todo', done: true }}
            onClickComplete={() => () => { }}
            onClickDelete={() => () => { deleted = true }} />);
        expect(deleted).toEqual(false);
        fireEvent.click(screen.getByText('Delete'));
        expect(deleted).toEqual(true);
    });

    test('sets done', () => {
        let completed = false;
        render(<Todo todo={{ _id: 'a', text: 'Testing todo', done: false }}
            onClickComplete={() => () => { completed = true }}
            onClickDelete={() => () => { }} />);
        expect(completed).toEqual(false);
        fireEvent.click(screen.getByText('Set as done'));
        expect(completed).toEqual(true);
    });
});
