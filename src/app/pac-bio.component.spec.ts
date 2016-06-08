import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';
import {PacBioAppComponent} from '../app/pac-bio.component';
import TableModel from '../app/classes/TableModel';
import TableDrawer from '../app/classes/TableDrawer';
import Location from '../app/classes/Location';

beforeEachProviders(() => [PacBioAppComponent]);

describe('App: PacBio', () => {
    it('should create the app',
        inject([PacBioAppComponent], (app:PacBioAppComponent) => {
            expect(app).toBeTruthy();
        }));

    it('should have as title \'pac-bio works!\'',
        inject([PacBioAppComponent], (app:PacBioAppComponent) => {
            expect(app.title).toEqual('pac-bio works!');
        }));

    describe('Location', () => {
        let location;

        beforeEach(() => location = Location.fromString('b4'));

        it('should have the expected row', () => expect(location.row).toEqual('B'));
        it('should have the expected column', () => expect(location.column).toEqual(4));
        it('should be valid', () => expect(location.valid).toBeTruthy());

        describe('(invalid)', () => {
            beforeEach(() => location = Location.fromString('4b'));

            it('should be invalid', () => expect(location.valid).toBeFalsy());
        });
    });

    describe('TableModel', () => {
        let table:TableModel;

        beforeEach(() => {
            table = new TableModel(1300, 900, 12, 8);
        });

        it('should have the expected width', () => expect(table.width).toEqual(1300));
        it('should have the expected height', () => expect(table.height).toEqual(900));

        it('should have the expected columnWidth', () => expect(table.columnWidth).toEqual(100));
        it('should have the expected rowHeight', () => expect(table.rowHeight).toEqual(100));

        describe('TableDrawer', () => {
            let drawer:TableDrawer;

            beforeEach(() => drawer = new TableDrawer(table));
            // note, as no canvasID is passed, canvas doesn't get initialized

            it('should have the expected box at 0, 0', () => {
                expect(drawer.box(0, 0)).toEqual({
                    top: 0,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    width: 100,
                    height: 100,
                    centerX: 50,
                    centerY: 50,
                    minRadius: 50
                });
            });
            it('should have the expected box at 0, 1', () => {
                expect(drawer.box(0, 1)).toEqual(
                    {
                        top: 100,
                        left: 0,
                        right: 100,
                        bottom: 200,
                        width: 100,
                        height: 100,
                        centerX: 50,
                        centerY: 150,
                        minRadius: 50
                    }
                );
            });
            it('should have the expected box at 1, 0', () => {
                expect(drawer.box(1, 0)).toEqual(
                    {
                        top: 0,
                        left: 100,
                        right: 200,
                        bottom: 100,
                        width: 100,
                        height: 100,
                        centerX: 150,
                        centerY: 50,
                        minRadius: 50
                    }
                );
            });
        });
    });
});

