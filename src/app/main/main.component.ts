import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  tasks: string[] = [];
  newTask: string = '';
  editedTask: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  editingIndex: number = -1;

  get pagedTasks(): string[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tasks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  editTask(index: number) {
    this.editingIndex = index;
    this.editedTask = this.tasks[index];
  }

  saveTask(index: number) {
    if (this.editedTask.trim() !== '') {
      this.tasks[index] = this.editedTask;
      this.editedTask = '';
      this.editingIndex = -1;
    }
  }

  cancelEdit() {
    this.editedTask = '';
    this.editingIndex = -1;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editingIndex === index) {
      this.editedTask = '';
      this.editingIndex = -1;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.itemsPerPage);
  }

  isTaskBeingEdited(index: number): boolean {
    return this.editingIndex === index;
  }
}
