package com.it15000118.af.stock.restapi.Model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "PharmacyStock")
public class pharmacySystemModel {

	@Id
	private String _Id;

	private String drugName;
	private String drugType;
	private String drugCategory;
	private String drugPrice;
	private String drugQuantity;
	private Date expDate;

	public pharmacySystemModel() {

	}

		

	public pharmacySystemModel(String drugName, String drugType, String drugCategory, String drugPrice,
			String drugQuantity, Date expDate) {
		super();
		this.drugName = drugName;
		this.drugType = drugType;
		this.drugCategory = drugCategory;
		this.drugPrice = drugPrice;
		this.drugQuantity = drugQuantity;
		this.expDate = expDate;
	}



	public Date getExpDate() {
		return expDate;
	}



	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}



	public String get_Id() {
		return _Id;
	}

	public void set_Id(String _Id) {
		this._Id = _Id;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getDrugType() {
		return drugType;
	}

	public void setDrugType(String drugType) {
		this.drugType = drugType;
	}

	public String getDrugCategory() {
		return drugCategory;
	}

	public void setDrugCategory(String drugCategory) {
		this.drugCategory = drugCategory;
	}

	public String getDrugPrice() {
		return drugPrice;
	}

	public void setDrugPrice(String drugPrice) {
		this.drugPrice = drugPrice;
	}

	public String getDrugQuantity() {
		return drugQuantity;
	}

	public void setDrugQuantity(String drugQuantity) {
		this.drugQuantity = drugQuantity;
	}

	
}
