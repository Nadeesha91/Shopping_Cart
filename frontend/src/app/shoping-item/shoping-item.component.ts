import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';


declare var M:any;
@Component({
  selector: 'app-shoping-item',
  templateUrl: './shoping-item.component.html',
  styleUrls: ['./shoping-item.component.css'],
  providers : [DataService],
})
export class ShopingItemComponent implements OnInit {
  shoppingItemList : Item[] = [];
  selectedItem : Item;
  toggleForm : boolean = false;

  constructor(private dataService : DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
    .subscribe( items => {
      this.shoppingItemList=items;
      // console.log('data from dataservice : '+this.shoppingItemList[0].itemName);

    });

  }

  addItem(frm){
    let newItem: Item ={
      itemName : frm.value.itemName,
      itemQuantity:frm.value.itemQuantity,
      itemBought : false
    }
    this.dataService.addShoppingItem(newItem)
    .subscribe(item => {
      console.log(item);
      this.getItems();
      M.toast({html: 'Updated successfully', classes:'rounded'});
    });
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe(data =>{
      console.log(data);
        if(data.n == 1){
          for(var i=0; i< this.shoppingItemList.length;i++){
            if(id==this.shoppingItemList[i]._id){
              this.shoppingItemList.splice(i,1);
            }
          }
        }
    })

  }

  editItem(editform){
    let newItem : Item={
      _id : this.selectedItem._id,
      itemName : editform.value.itemName,
      itemQuantity : editform.value.itemQuantity,
      itemBought:this.selectedItem.itemBought
    }
    this.dataService.updateShoppingItem(newItem)
    .subscribe(result => {
      console.log('Original Item to be updated with old values:'+result.itemQuantity);
      this.getItems();
    });
    this.toggleForm=!this.toggleForm;
  }

   showEditForm(item){
     this.selectedItem=item;
     this.toggleForm= !this.toggleForm;
   }

   updateItemCheckbox(item){
     item.itemBought=!item.itemBought;
     this.dataService.updateShoppingItem(item)
     .subscribe(result =>{
       console.log('Original checkbox values:'+result.itemBought);
       this.getItems();
     });
   }

  ngOnInit(){
    this.getItems();
  }

}
